varying float vElevation;

void main() {
    vec4 color1 = vec4(1., 0.6702, 0.9215, 1.);
    vec4 color2 = vec4(1., 0.8509, 0.9647, 1.);
    vec4 color3 = vec4(1.);
    float v = smoothstep(-1., 1., vElevation * 3.);

    vec4 color = mix(color1, color2, v);

    gl_FragColor = color;
}