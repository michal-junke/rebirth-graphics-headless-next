import React, { Component } from 'react';
import Glide from '@glidejs/glide';


class GlideSlider extends Component {
    componentDidMount = () => {
      setTimeout(() => {
        this.initializeSlider();
      }, 1);
    }

    initializeSlider = () => {
      const {
        options, instance, mobile, desktop,
      } = this.props;
      const initialize = () => {
        const glide = document.querySelector(`.glide-${instance}`);
        this.glide = new Glide(glide, options);
        this.glide.mount();
      };

      if (mobile) {
        if (window.innerWidth < 768) {
          initialize();
        }
      } else if (desktop) {
        if (window.innerWidth >= 768) {
          initialize();
        }
      } else {
        initialize();
      }
    }


    componentWillUnmount = () => {
      if (this.glide) {
        this.glide.destroy();
      }
    }


    render() {
      const {
        instance, className, children, buttons,
      } = this.props;
      return (
        <>
          <div className="overflow-hidden w-full">
            <div id="slider" className={`glide-${instance} ${className} relative`}>
              <div className="absolute w-full h-full" data-glide-el="controls">
                <button type="button" className={`${buttons ? 'md:block' : ''} hidden absolute right-0 inset-y-0 z-10 pr-6 text-white`} data-glide-dir=">">
                  <svg width="61" height="61" viewBox="0 0 61 61" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M30.5 5.33279e-06C13.664 2.38909e-06 -2.38909e-06 13.664 -5.33279e-06 30.5C-8.27649e-06 47.336 13.664 61 30.5 61C47.336 61 61 47.336 61 30.5C61 13.664 47.336 8.27649e-06 30.5 5.33279e-06ZM24.4 44.225L24.4 16.775L42.7 30.5L24.4 44.225Z" fill="white" fillOpacity="0.7" />
                  </svg>
                </button>
                <button type="button" className={`${buttons ? 'md:block' : ''} hidden absolute left-0 inset-y-0 z-10 pl-6 text-white`} data-glide-dir="<">
                  <svg width="61" height="61" viewBox="0 0 61 61" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M30.5 61C47.336 61 61 47.336 61 30.5C61 13.664 47.336 -2.62015e-06 30.5 -1.1483e-06C13.664 3.23547e-07 3.49115e-06 13.664 4.963e-06 30.5C6.43485e-06 47.336 13.664 61 30.5 61ZM36.6 16.775L36.6 44.225L18.3 30.5L36.6 16.775Z" fill="white" fillOpacity="0.7" />
                  </svg>
                </button>
              </div>
              <div className="glide__track" data-glide-el="track">
                <ul className="glide__slides flex">
                  {children.map((slide, index) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <li className="glide__slide" key={index}>
                      {slide}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </>
      );
    }
}

export default GlideSlider;
