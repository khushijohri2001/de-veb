varying float vElevation;
uniform float uColorChange;

void main() {
    vec4 color1 = vec4(1., 0.6702, 0.9215, 1.);
    vec4 color2 = vec4(1., 0.8509, 0.9647, 1.);

    vec4 color3 = vec4(1., 0.9529, 0.8, 1.);
    vec4 color4 = vec4(1., 0.9764, 0.9019, 1.);

    float v = smoothstep(-1., 1., vElevation * 3.);

    vec4 colorpink = mix(color1, color2, v);
    vec4 colorblue = mix(color3, color4, v);

    vec4 final = mix(colorpink, colorblue, uColorChange);

    gl_FragColor = final;
}