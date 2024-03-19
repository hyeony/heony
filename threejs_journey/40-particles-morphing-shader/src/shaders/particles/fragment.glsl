void main()
{
  vec2 uv = gl_PointCoord;
  //포인트 중심과 현재 픽셀 좌표 사이의 거리르 계산한다. 상대적인 거리를 나타냄.
  float distanceToCenter = length(uv - 0.5);
  //중심으로부터의 거리에 따라 알파값을 결정. 거리가 멀어질수록 alpha값은 증가하며 거리가 0에가까워질수록 alpha값은 무한대에 가까워짐. 이는 포인트가 중심으로부터 멀어질수록 투명도가 증가하는 효과를 제공.
  float alpha = 0.05 / distanceToCenter - 0.1;

  gl_FragColor = vec4(1.0, 1.0, 1.0, alpha);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}