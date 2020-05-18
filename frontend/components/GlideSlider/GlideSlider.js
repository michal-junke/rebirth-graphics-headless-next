import React, { Component } from 'react';
import Glide from '@glidejs/glide';


class GlideSlider extends Component {
    componentDidMount = () => {
      setTimeout(() => {
        this.initializeSlider();
      }, 1);
    }

    initializeSlider = () => {

        let initialize = () => {
            let glide = document.querySelector(`.glide-${this.props.instance}`);
            this.glide = new Glide (glide, this.props.options);
            this.glide.mount();
        }

        if (this.props.mobile) {
            if (window.innerWidth < 768) {
                initialize();
            }
        } else if (this.props.desktop) {
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
       return (
           <>
    <div className="overflow-hidden w-full">
    <div id="slider" className={`glide-${this.props.instance} ${this.props.className}`}>
        <div className="glide__track" data-glide-el="track">
        <ul className="glide__slides flex">
            {this.props.children.map( (slide, index) => {
                return(
                <li className="glide__slide" key={index}>
                    {slide}
                </li>
                )
            })}
        </ul>
        </div>
    </div>
    </div>
    </>
)
   }
    }

export default GlideSlider;