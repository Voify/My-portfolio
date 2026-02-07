"use client";

import React, { useEffect, useRef } from 'react';
import {
  Scene, OrthographicCamera, WebGLRenderer, PlaneGeometry,
  Mesh, ShaderMaterial, Vector3, Vector2, Clock
} from 'three';

// --- GLSL SHADERS ---
const vertexShader = `
precision highp float;
void main() {
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
precision highp float;
uniform float iTime;
uniform vec3 iResolution;
uniform float animationSpeed;
uniform bool enableTop;
uniform bool enableMiddle;
uniform bool enableBottom;
uniform int topLineCount;
uniform int middleLineCount;
uniform int bottomLineCount;
uniform float topLineDistance;
uniform float middleLineDistance;
uniform float bottomLineDistance;
uniform vec3 topWavePosition;
uniform vec3 middleWavePosition;
uniform vec3 bottomWavePosition;
uniform vec2 iMouse;
uniform bool interactive;
uniform float bendRadius;
uniform float bendStrength;
uniform float bendInfluence;
uniform bool parallax;
uniform float parallaxStrength;
uniform vec2 parallaxOffset;
uniform vec3 lineGradient[8];
uniform int lineGradientCount;

mat2 rotate(float r) {
  return mat2(cos(r), sin(r), -sin(r), cos(r));
}

vec3 getLineColor(float t) {
  if (lineGradientCount <= 0) return vec3(0.1);
  float clampedT = clamp(t, 0.0, 0.9999);
  float scaled = clampedT * float(lineGradientCount - 1);
  int idx = int(floor(scaled));
  float f = fract(scaled);
  int idx2 = min(idx + 1, lineGradientCount - 1);
  return mix(lineGradient[idx], lineGradient[idx2], f) * 0.5;
}

float wave(vec2 uv, float offset, vec2 screenUv, vec2 mouseUv, bool shouldBend) {
  float time = iTime * animationSpeed;
  float amp = sin(offset + time * 0.2) * 0.3;
  float y = sin(uv.x + offset + (time * 0.1)) * amp;
  if (shouldBend) {
    vec2 d = screenUv - mouseUv;
    float influence = exp(-dot(d, d) * bendRadius);
    y += (mouseUv.y - screenUv.y) * influence * bendStrength * bendInfluence;
  }
  return 0.0175 / max(abs(uv.y - y) + 0.01, 1e-3) + 0.01;
}

void main() {
  vec2 fragCoord = gl_FragCoord.xy;
  vec2 baseUv = (2.0 * fragCoord - iResolution.xy) / iResolution.y;
  baseUv.y *= -1.0;
  if (parallax) baseUv += parallaxOffset;

  vec3 col = vec3(0.0);
  vec2 mouseUv = (2.0 * iMouse - iResolution.xy) / iResolution.y;
  mouseUv.y *= -1.0;

  if (enableBottom) {
    for (int i = 0; i < 8; i++) {
      if(i >= bottomLineCount) break;
      float fi = float(i);
      vec3 lineCol = getLineColor(fi/max(float(bottomLineCount-1),1.0));
      vec2 ruv = baseUv * rotate(bottomWavePosition.z * log(length(baseUv) + 1.0));
      col += lineCol * wave(ruv + vec2(bottomLineDistance * fi + bottomWavePosition.x, bottomWavePosition.y), 1.5 + 0.2 * fi, baseUv, mouseUv, interactive) * 0.2;
    }
  }
  if (enableMiddle) {
    for (int i = 0; i < 8; i++) {
      if(i >= middleLineCount) break;
      float fi = float(i);
      vec3 lineCol = getLineColor(fi/max(float(middleLineCount-1),1.0));
      vec2 ruv = baseUv * rotate(middleWavePosition.z * log(length(baseUv) + 1.0));
      col += lineCol * wave(ruv + vec2(middleLineDistance * fi + middleWavePosition.x, middleWavePosition.y), 2.0 + 0.15 * fi, baseUv, mouseUv, interactive);
    }
  }
  if (enableTop) {
    for (int i = 0; i < 8; i++) {
      if(i >= topLineCount) break;
      float fi = float(i);
      vec3 lineCol = getLineColor(fi/max(float(topLineCount-1),1.0));
      vec2 ruv = (baseUv * vec2(-1.0, 1.0)) * rotate(topWavePosition.z * log(length(baseUv) + 1.0));
      col += lineCol * wave(ruv + vec2(topLineDistance * fi + topWavePosition.x, topWavePosition.y), 1.0 + 0.2 * fi, baseUv, mouseUv, interactive) * 0.1;
    }
  }
  gl_FragColor = vec4(col, 1.0);
}
`;
interface WavePos { x?: number; y?: number; rotate?: number; }
interface FloatingLinesProps {
  linesGradient?: string[]; enabledWaves?: string[];
  lineCount?: number | number[]; lineDistance?: number | number[];
  topWavePosition?: WavePos; middleWavePosition?: WavePos; bottomWavePosition?: WavePos;
  animationSpeed?: number; interactive?: boolean; bendRadius?: number;
  bendStrength?: number; mouseDamping?: number; parallax?: boolean;
  parallaxStrength?: number; mixBlendMode?: string;
}

function hexToVec3(hex: string) {
  const v = hex.replace('#', '');
  const r = parseInt(v.length === 3 ? v[0]+v[0] : v.slice(0,2), 16) / 255;
  const g = parseInt(v.length === 3 ? v[1]+v[1] : v.slice(2,4), 16) / 255;
  const b = parseInt(v.length === 3 ? v[2]+v[2] : v.slice(4,6), 16) / 255;
  return new Vector3(r, g, b);
}

export default function FloatingLines(props: FloatingLinesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const targetMouseRef = useRef(new Vector2(-1000, -1000));
  const currentMouseRef = useRef(new Vector2(-1000, -1000));
  const targetInfluenceRef = useRef(0);
  const currentInfluenceRef = useRef(0);
  const targetParallaxRef = useRef(new Vector2(0, 0));
  const currentParallaxRef = useRef(new Vector2(0, 0));

  useEffect(() => {
    if (!containerRef.current) return;
    const el = containerRef.current;
    const scene = new Scene();
    const camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    el.appendChild(renderer.domElement);

    const uniforms = {
      iTime: { value: 0 }, iResolution: { value: new Vector3() },
      animationSpeed: { value: props.animationSpeed ?? 1 },
      enableTop: { value: props.enabledWaves?.includes('top') ?? true },
      enableMiddle: { value: props.enabledWaves?.includes('middle') ?? true },
      enableBottom: { value: props.enabledWaves?.includes('bottom') ?? true },
      topLineCount: { value: 6 }, middleLineCount: { value: 6 }, bottomLineCount: { value: 6 },
      topLineDistance: { value: 0.05 }, middleLineDistance: { value: 0.05 }, bottomLineDistance: { value: 0.05 },
      topWavePosition: { value: new Vector3(props.topWavePosition?.x ?? 10, props.topWavePosition?.y ?? 0.5, props.topWavePosition?.rotate ?? -0.4) },
      middleWavePosition: { value: new Vector3(props.middleWavePosition?.x ?? 5, props.middleWavePosition?.y ?? 0, props.middleWavePosition?.rotate ?? 0.2) },
      bottomWavePosition: { value: new Vector3(props.bottomWavePosition?.x ?? 2, props.bottomWavePosition?.y ?? -0.7, props.bottomWavePosition?.rotate ?? 0.4) },
      iMouse: { value: new Vector2(-1000, -1000) }, interactive: { value: props.interactive ?? true },
      bendRadius: { value: props.bendRadius ?? 5 }, bendStrength: { value: props.bendStrength ?? -0.5 }, bendInfluence: { value: 0 },
      parallax: { value: props.parallax ?? true }, parallaxStrength: { value: props.parallaxStrength ?? 0.2 }, parallaxOffset: { value: new Vector2(0, 0) },
      lineGradient: { value: Array.from({ length: 8 }, () => new Vector3(1,1,1)) }, lineGradientCount: { value: 0 }
    };

    if (props.linesGradient) {
      uniforms.lineGradientCount.value = Math.min(props.linesGradient.length, 8);
      props.linesGradient.slice(0, 8).forEach((hex, i) => uniforms.lineGradient.value[i].copy(hexToVec3(hex)));
    }

    const material = new ShaderMaterial({ uniforms, vertexShader, fragmentShader });
    const mesh = new Mesh(new PlaneGeometry(2, 2), material);
    scene.add(mesh);

    const clock = new Clock();
    const handleResize = () => {
      const w = el.clientWidth, h = el.clientHeight;
      renderer.setSize(w, h, false);
      uniforms.iResolution.value.set(w * renderer.getPixelRatio(), h * renderer.getPixelRatio(), 1);
    };
    handleResize();
    const ro = new ResizeObserver(handleResize);
    ro.observe(el);

    const onPointerMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left, y = e.clientY - rect.top;
      targetMouseRef.current.set(x * renderer.getPixelRatio(), (rect.height - y) * renderer.getPixelRatio());
      targetInfluenceRef.current = 1;
      if (props.parallax) targetParallaxRef.current.set(((x - rect.width/2)/rect.width)*0.2, (-(y - rect.height/2)/rect.height)*0.2);
    };

    el.addEventListener('pointermove', onPointerMove);
    let raf: number;
    const animate = () => {
      uniforms.iTime.value = clock.getElapsedTime();
      currentMouseRef.current.lerp(targetMouseRef.current, 0.05);
      uniforms.iMouse.value.copy(currentMouseRef.current);
      currentInfluenceRef.current += (targetInfluenceRef.current - currentInfluenceRef.current) * 0.05;
      uniforms.bendInfluence.value = currentInfluenceRef.current;
      currentParallaxRef.current.lerp(targetParallaxRef.current, 0.05);
      uniforms.parallaxOffset.value.copy(currentParallaxRef.current);
      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      renderer.dispose();
      material.dispose();
      renderer.domElement.remove();
    };
  }, [props]);

  return <div ref={containerRef} className="floating-lines-container" style={{ width: '100%', height: '100%', mixBlendMode: (props.mixBlendMode as any) || 'screen' }} />;
}