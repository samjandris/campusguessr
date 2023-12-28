export interface Campus {
  name: string;
  video_id: string;
  video_start: number;
  location: {
    latitude: number;
    longitude: number;
  };
}
