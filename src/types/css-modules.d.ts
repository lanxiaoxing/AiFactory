declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module 'leaflet/dist/leaflet.css' {
  const content: string;
  export default content;
}