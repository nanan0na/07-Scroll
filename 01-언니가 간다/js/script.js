$(function () {
  // 대상을 변수에 저장
  const $window = $(window); // scroll작동이니까 window 불러오기
  const $document = $(document);
  const $girl = $('.girl');

  // 크기를 구해오는 제이쿼리 메서드 : outerHeight()
  let windowHeight = $window.outerHeight();
  let documentHeight = $document.outerHeight();

  // 스크롤 영역의 (세로)크기
  let scrollHeight = documentHeight - windowHeight;

  // 브라우저 창이 조절될 때
  $window.on('resize', function () {
    windowHeight = $window.outerHeight();
    documentHeight = $document.outerHeight();
    scrollHeight = documentHeight - windowHeight;
    console.log(scrollHeight);
  });

  // 스크롤이 발생하면
  $window.on('scroll', function () {
    // 사용자의 (세로)스크롤 값을 구해서
    let scrollTop = $(this).scrollTop();

    // 비율 구하는 공식 : (대상 / 기준) * 100
    let percent = (scrollTop / scrollHeight) * 100 + '%';

    // $progressBar의 width로 적용(%)
    $girl.css('left', percent);

    // 마우스 휠 조작했을 때
    $window.on('wheel keydown', function (e) {
      console.log(e);

      if (e.originalEvent.deltaY < 0 || e.keyCode === 38) {
        // 휠을 올렸을 때
        $girl.css('transform', 'rotateY(180deg)');
      } else if (e.originalEvent.deltaY > 0 || e.keyCode === 40) {
        // 휠을 내렸을 때
        $girl.css('transform', 'rotateY(0deg)');
      }
    });
  });
});
