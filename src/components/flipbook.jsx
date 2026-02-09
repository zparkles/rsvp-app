import { useEffect, useRef } from "react";

export default function Flipbook(cover, page1, page2, back) {
  const flipbookRef = useRef(null);

  useEffect(() => {
//       const $ = window.$;
//
//     console.log($.fn.turn);
//     const $flipbook = $(flipbookRef.current);

    const $ = window.jQuery; // NOT import, NOT $
  const $flipbook = $(flipbookRef.current);

  console.log("$.fn.turn =", $.fn.turn);

  if (!$.fn.turn) {
    console.error("Turn.js did not load");
    return;
  }

    if ($flipbook.data("turn")) return;

    $flipbook.turn({
      width: 500,
      height: 350,
      autoCenter: true
    });

    return () => {
      if ($flipbook.data("turn")) {
        $flipbook.turn("destroy");
      }
    };
  }, []);

  return (
    <div
      ref={flipbookRef}
      id="flipbook"
      style={{ width: 500, height: 350 }}
    >
      <div><img src = {cover}/></div>
      <div>{page1}</div>
      <div>{page2}</div>
      <div>{back}</div>
    </div>
  );
}
