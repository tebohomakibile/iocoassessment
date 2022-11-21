import {Component, HostListener, Input, OnInit, ViewChild} from '@angular/core'
import {SliderInterface} from '../interface/slider-interface'

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  // styleUrls: ['./slider.component.scss'],
  styles: [`.slider {
    display: flex;
    flex-direction: column;
    position: relative;
  
    .slider-container {
      width: 100vw;
      height: 28rem;
      overflow: hidden;
      background-color: rgba(255, 255, 255, 0.525);
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 1rem;
      font-family: sans-serif;
      position: relative;
  
      .card {
        width: 16rem;
        height: 14rem;
        border-radius: 1rem;
        background-color: white;
        overflow: hidden;
        position: relative;
        -webkit-box-shadow: 0px 6px 14px -4px rgba(0, 0, 0, 0.75);
        -moz-box-shadow: 0px 6px 14px -4px rgba(0, 0, 0, 0.75);
        box-shadow: 0px 6px 14px -4px rgba(0, 0, 0, 0.75);
  
        .image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
  
        .title {
          position: absolute;
          background-color: rgba(0, 0, 0, 0.535);
          color: rgb(199, 199, 199);
          bottom: 0;
          width: 100%;
          display: flex;
          justify-content: center;
          padding: 0.3rem;
        }
  
        &.active {
          transform: scale(1.8);
          z-index: 10;
        }
  
        &.next {
          transform: scale(1.3);
          z-index: 8;
        }
  
        &.last {
          transform: scale(1);
          z-index: 6;
        }
      }
    }
  
    .previousButton,
    .nextButton {
      position: absolute;
      bottom: 50%;
      z-index: 99;
      cursor: pointer;
      transition: 0.5s ease-in-out;
      font-size: 5rem;
      fill: rgb(255, 255, 255);
  
      &:hover {
        transform: scale(1.5);
        -webkit-box-shadow: 0px 6px 14px -4px rgba(0, 0, 0, 0.75);
        -moz-box-shadow: 0px 6px 14px -4px rgba(0, 0, 0, 0.75);
        box-shadow: 0px 6px 14px -4px rgba(0, 0, 0, 0.75);
      }
    }
  
    .previousButton {
      left: 2rem;
    }
  
    .nextButton {
      right: 2rem;
    }
  }
  
  @media (min-width: 992px) {
  }`]
})
export class SliderComponent implements OnInit {
  @Input('data') data: SliderInterface[] = []
  @Input('timer') timer: number | undefined

  cardContainers: number = window.innerWidth > 990 ? 5 : 3
  containerArrayBlock: Array<any> = new Array(this.cardContainers)
  sliderData: SliderInterface[] = []
  selectedIndex: number = 0

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    let windowWidth = event.target.innerWidth
    if (windowWidth > 990) {
      this.containerArrayBlock = new Array(5)
    } else {
      this.containerArrayBlock = new Array(3)
    }
  }

  constructor() {}

  ngOnInit(): void {
    this.setSliderItems()
    this.onAutoScroll()
  }

  getClass(i: number): string {
    let className = ''
    if (window.innerWidth > 990) {
      switch (i) {
        case 0:
        case 4:
          className = 'last'

          break
        case 1:
        case 3:
          className = 'next'
          break
        case 2:
          className = 'active'
          break
      }
    } else {
      switch (i) {
        case 0:
        case 2:
          className = 'next'
          break
        case 1:
          className = 'active'
          break
      }
    }

    return className
  }

  onNext(): void {
    if (this.selectedIndex < this.data.length - 1) {
      this.selectedIndex++
    } 
    else {
      this.selectedIndex = 0
    }

    this.setSliderItems()
  }

  onPrevious(): void {
    if (this.selectedIndex < this.data.length - 1) {
      this.selectedIndex++
    } 
    else {
      this.selectedIndex = 0
    }

    this.setSliderItems()
  }

  setSliderItems(): void {
    let temp = 0

    this.sliderData = []

    for (let i = 0; i < this.cardContainers; i++) {
      if (this.data[i + this.selectedIndex]) {
        this.sliderData.push(this.data[i + this.selectedIndex])
      } else {
        this.sliderData.push(this.data[temp])
        temp++
      }
    }
  }

  onAutoScroll(): void {
    if (Number(this.timer)) {
      setInterval(() => this.onNext(), Number(this.timer) * 1000)
    }
  }
}
