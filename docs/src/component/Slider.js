import React from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "./Slider.css";
import Slider1 from "../images/slider-1.jpg";
import Slider2 from "../images/slider-2.jpg";
import Slider3 from "../images/slider-3.jpg";
import Slider4 from "../images/slider-4.jpg";
import Slider5 from "../images/slider-5.jpg";

export default class Slider extends React.Component {
  componentDidMount() {
    const $ = window.jQuery;
    $(".set-bg").each(function() {
      var bg = $(this).data("setbg");
      console.log(bg);
      $(this).css("background-image", "url(" + bg + ")");
    });
  }

  render() {
    return (
      <section class="hero-section">
        <OwlCarousel className="owl-theme home-page" loop margin={10} items={1} dots={false} autoplay>
          <div class="hero-slider item">
            <div className="hs-item set-bg" data-setbg={Slider1}>
              <div className="hs-text">
                <div className="hs-container">
                  <h2>
                    最佳 <span>骰子</span> 游戏
                  </h2>
                  <p>
                    一颗骰子有六个数字，到底会出现哪个？ <br />
                    简单易懂，猜中就是你的。
                  </p>
                  <a href="dice" className="site-btn">
                    Play Now
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div class="hero-slider item">
            <div className="hs-item set-bg" data-setbg={Slider2}>
              <div className="hs-text">
                <div className="hs-container">
                  <h2>
                    <span>两颗骰子</span> 游戏
                  </h2>
                  <p>
                    觉得一个骰子不够看，想要两个一起玩，这里让你实现这个梦想！ <br />
                    一个骰子就那麽好玩，那还不试试看两个骰子？
                  </p>
                  <a href="two_dice" className="site-btn">
                    Play Now
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div class="hero-slider item">
            <div className="hs-item set-bg" data-setbg={Slider3}>
              <div className="hs-text">
                <div className="hs-container">
                  <h2>
                    <span>翻转钱币</span>
                  </h2>
                  <p>
                    一个钱币有两面，一个是头一个是花，到底是出现头还是花？进来瞧瞧吧！<br />
                    有一半的机率可以猜中，快来试手气！
                  </p>
                  <a href="coin_flip" className="site-btn">
                    Play Now
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div class="hero-slider item">
            <div className="hs-item set-bg" data-setbg={Slider4}>
              <div className="hs-text">
                <div className="hs-container">
                  <h2>
                    <span>点数猜猜乐</span>
                  </h2>
                  <p>
                    厌倦了必须精准猜中数字的游戏吗？这里让你可以不必精准猜中数字也能得奖！
                    <br />
                    高达 98 倍的赔率，还等什麽？
                  </p>
                  <a href="etheroll" className="site-btn">
                    Play Now
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div class="hero-slider item">
            <div className="hs-item set-bg" data-setbg={Slider5}>
              <div className="hs-text">
                <div className="hs-container">
                  <h2>
                    今天 <span>股票</span> 涨几倍
                  </h2>
                  <p>
                    在波涛汹涌的股市中，你是否能成为大赢家？
                    <br />
                    最高 1000 倍的涨幅由你决定
                  </p>
                  <a href="endless" className="site-btn">
                    Play Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </OwlCarousel>
      </section>
    );
  }
}
