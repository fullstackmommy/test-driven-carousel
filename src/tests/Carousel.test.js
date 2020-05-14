import React from "react";
import { mount, shallow } from "enzyme";
import Carousel, { Carousel as CoreCarousel } from "../Carousel";
import CarouselButton from "../CarouselButton";
import CarouselSlide from "../CarouselSlide";

describe("Carousel", () => {
  const slides = [
    {
      imgUrl: "https://example.com/slide1.png",
      description: "Slide 1",
      attribution: "One"
    },
    {
      imgUrl: "https://example.com/slide2.png",
      description: "Slide 2",
      attribution: "Two"
    },
    {
      imgUrl: "https://example.com/slide3.png",
      description: "Slide 3",
      attribution: "Three"
    }
  ];

  describe("components with HOC", () => {
    let mounted;
    beforeEach(() => {
      mounted = mount(<Carousel slides={slides} />);
    });

    it("should pass slides down to the core component", () => {
      expect(mounted.find(CoreCarousel).prop("slides")).toBe(slides);
    });

    it("should set slideIndex= {0} on the core component", () => {
      expect(mounted.find(CoreCarousel).prop("slideIndex")).toBe(0);
    });

    it("should allow slideIndex to be controlled", () => {
      const mounted = mount(<Carousel slides={slides} slideIndex={1} />);
      expect(mounted.find(CoreCarousel).prop("slideIndex")).toBe(1);
      mounted.setProps({ slideIndex: 0 });
      expect(mounted.find(CoreCarousel).prop("slideIndex")).toBe(0);
    });

    it("should advance the slide after autoAdvanceDelay elapses", () => {
      jest.useFakeTimers();
      const autoAdvanceDelay = 10e3;
      mounted = mount(
        <Carousel slides={slides} autoAdvanceDelay={autoAdvanceDelay} />
      );
      jest.advanceTimersByTime(autoAdvanceDelay);
      mounted.update();
      expect(mounted.find(CoreCarousel).prop("slideIndex")).toBe(1);
    });
  });

  describe("core component", () => {
    const slideIndexDecrement = jest.fn();
    const slideIndexIncrement = jest.fn();
    let wrapper;

    beforeEach(() => {
      wrapper = shallow(
        <CoreCarousel
          slides={slides}
          slideIndex={0}
          slideIndexDecrement={slideIndexDecrement}
          slideIndexIncrement={slideIndexIncrement}
        />
      );
    });

    it("should render a <div>", () => {
      expect(wrapper.type()).toBe("div");
    });

    it("should render a CarouselButton labeled Prev", () => {
      expect(
        wrapper
          .find(CarouselButton)
          .at(0)
          .prop("children")
      ).toBe("Prev");
    });

    it("should render a carouselButton labeled Next", () => {
      expect(
        wrapper
          .find(CarouselButton)
          .at(1)
          .prop("children")
      ).toBe("Next");
    });

    it("should render the current slide as a CarouselSlide", () => {
      let slideProps;
      slideProps = wrapper.find(CarouselSlide).props();
      expect(slideProps).toEqual({
        ...CarouselSlide.defaultProps,
        ...slides[0]
      });
      wrapper.setProps({ slideIndex: 1 });
      slideProps = wrapper.find(CarouselSlide).props();
      expect(slideProps).toEqual({
        ...CarouselSlide.defaultProps,
        ...slides[1]
      });
    });

    it("should decrement slideIndex when Prev is clicked", () => {
      wrapper.find('[data-action="prev"]').simulate("click");
      expect(slideIndexDecrement).toHaveBeenCalledWith(slides.length);
    });

    it("should increment slideIndex when Next is clicked", () => {
      wrapper.find('[data-action="next"]').simulate("click");
      expect(slideIndexIncrement).toHaveBeenCalledWith(slides.length);
    });

    it("should pass defaultImg and defaultImgHeight to the CarouselSlide", () => {
      const defaultImg = () => "test";
      const defaultImgHeight = 1234;
      wrapper.setProps({ defaultImg, defaultImgHeight });
      expect(wrapper.find(CarouselSlide).prop("Img")).toBe(defaultImg);
      expect(wrapper.find(CarouselSlide).prop("imgHeight")).toBe(
        defaultImgHeight
      );
    });

    it("should allow individual slides to override Img and imgHeight", () => {
      const Img = () => "test";
      const imgHeight = 1234;
      wrapper.setProps({ slides: [{ ...slides[0], Img, imgHeight }] });
      expect(wrapper.find(CarouselSlide).prop("Img")).toBe(Img);
      expect(wrapper.find(CarouselSlide).prop("imgHeight")).toBe(imgHeight);
    });
  });
});
