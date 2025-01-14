import flowbite from "flowbite-react/tailwind";

export const plugins = [
  flowbite.plugin(),
];
export const content = [
  './app/views/**/*.html.erb',
  './app/helpers/**/*.rb',
  './app/assets/stylesheets/**/*.css',
  './app/javascript/**/*.js',
  './node_modules/flowbite-react/lib/**/*.{js,ts}',
  "./app/javascript/components/**/*.{js,ts,jsx,tsx}",
  flowbite.content(),
];
