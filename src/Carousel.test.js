import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";
import Card from './Card.js';
import TEST_IMAGES from "./_testCommon.js";


//smoke tests
it('renders without crashing', function(){
  render(<Card/>);
});

it('renders Carousel without crashing', function(){
  render(<Carousel photos={TEST_IMAGES} title='test'/>);
});


//snapshot tests
it('Card matches snapshot', function(){
  const {asFragment} = render(<Card/>);
  expect(asFragment()).toMatchSnapshot();
});

it('Carousel matches snapshot', function(){
  const {asFragment} = render(<Carousel photos={TEST_IMAGES} title='test'/>);
  expect(asFragment()).toMatchSnapshot();
})



it("works when you click on the right arrow", function() {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );
  // expect the first image to show, but not the second
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).not.toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).toBeInTheDocument();
});

it('works when you click on the left arrow', function(){
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );
  // expect the first image to show, but not the second
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).not.toBeInTheDocument();

  // move forward and backward in the carousel
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);
  const leftArrow = container.querySelector(".bi-arrow-left-circle");
  fireEvent.click(leftArrow);

  // still expect the first image to show, but not the second
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).not.toBeInTheDocument();
});

it('works when you cycle past the first and last image', function(){
  const {container} = render(<Carousel photos={TEST_IMAGES} title='test'/>);
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();

  const leftArrow = container.querySelector(".bi-arrow-left-circle");
  fireEvent.click(leftArrow);

  expect(
    container.querySelector('img[alt="testing image 3"]')
  ).toBeInTheDocument();

  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);

  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();
})
