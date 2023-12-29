export interface Mode {
  title: string;
  data: {
    name: string;
    image: string;
    filterId: string;
    filterValue: string;
  }[];
}

export interface Campus {
  name: string;
  video_id: string;
  video_start: number;
  location: {
    latitude: number;
    longitude: number;
  };
}
