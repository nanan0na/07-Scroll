$(function () {
  // 대상을 변수에 저장
  const $window = $(window); // scroll작동이니까 window 불러오기
  const $document = $(document);
  const $girl = $('.girl');
  const $cat = $('.cat');

  // 전역변수로 선언
  let windowHeight = 0;
  let documentHeight = 0;
  let scrollHeight = 0;

  // 스크롤 영역을 구하는 함수
  function getHeight() {
    windowHeight = $window.outerHeight();
    documentHeight = $document.outerHeight();
    scrollHeight = documentHeight - windowHeight;
  }

  // 시작하자마자 스크롤 영역 구하기
  getHeight();
  // 시작하자마자 숨기기
  $girl.add($cat).hide();

  // 브라우저 창이 조절될 때
  $window.on('resize', function () {
    getHeight();
    console.log(scrollHeight);

    // 스크롤 이벤트를 강제로 발생시킴 --> 최종 언니 위치 수정
    $window.trigger('scroll');
  });

  // 스크롤이 발생하면
  $window.on('scroll', function () {
    $girl.add($cat).show();
    // 사용자의 (세로)스크롤 값을 구해서
    let scrollTop = $(this).scrollTop();

    // 비율 구하는 공식 : (대상 / 기준) * 100
    let percent = (scrollTop / scrollHeight) * 100 + '%';

    // $progressBar의 width로 적용(%)
    $girl.css('left', percent);
    $cat.css('left', percent);

    // if (scrollTop === 0) {
    //   $girl.add($cat).fadeOut();
    // } else {
    //   $girl.add($cat).fadeIn();
    // }

    // 삼항조건 연산자
    scrollTop ? $girl.add($cat).fadeIn() : $girl.add($cat).fadeOut();

    // 마우스 휠 조작했을 때
    $window.on('wheel keydown', function (e) {
      console.log(e);

      if (e.originalEvent.deltaY < 0 || e.keyCode === 38) {
        // 휠을 올렸을 때
        $girl.css('transform', 'rotateY(180deg)');
        $cat.css('transform', 'rotateY(0deg)');
      } else if (e.originalEvent.deltaY > 0 || e.keyCode === 40) {
        // 휠을 내렸을 때
        $girl.css('transform', 'rotateY(0deg)');
        $cat.css('transform', 'rotateY(180deg)');
      }
    });
  });
});
