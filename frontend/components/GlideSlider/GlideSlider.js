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
        instance, className, children,
      } = this.props;
      return (
        <>
          <div className="overflow-hidden w-full">
            <div id="slider" className={`glide-${instance} ${className}`}>
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
