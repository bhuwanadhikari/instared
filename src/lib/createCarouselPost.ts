export type CarouselItem = {
  image_url?: string;
  video_url?: string;
  media_type?: "VIDEO";
  is_carouse_item: boolean;
};

export type CarouselItems = {
  items: CarouselItem[];
};

export const createCarouselPost = (items: CarouselItems) => {

  // TODO: create carousel-item container ids with loop

  // TODO: create carousel container

  // TODO: publish the carousel by the carousel container id

};
