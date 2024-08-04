# 3D Visual Table

This project allows users to create shapes and render them in the 3D Canvas. Each creation is saved in local storage and will appear in the table. Users can interact with the shapes they created via the camera + transformation controls provided by Three JS's transformControls and orbitControls plugins. Users have the option to render their created shapes either one at a time or render all created shapes.

## Table of Contents

- [Getting Started](#getting-started)
- [Components](#components)
- [Styling](#styling)
- [Learn More](#learn-more)

## Getting Started

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) + [Three JS](https://threejs.org) and components from [MaterialUI](https://mui.com/).

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/your-username/3d-visual-table.git
    cd 3d-visual-table
    ```

2. Install the dependencies:
    ```sh
    npm install
    ```

### Running the App

To run the app in development mode, use:
```sh
npm start

```

### Components

I created separate components for a better folder structure and overall cleaner code. 
The main components of the application include:

- **ShapeTable**: This component is responsible for displaying the table of shapes. It includes functionalities for adding and deleting shapes.
- **ShapeModal**: This component is a modal dialog used for creating new shapes. It includes form fields for shape properties such as name and type.
- **Canvas3D**: This component renders the 3D scene using Three.js. It handles the creation and manipulation of 3D objects and integrates with the rest of the application to reflect changes in the shape data.
- **Tooltip**: This component provides additional information when rendering the shape/shapes such as keyboard shortcuts. It enhances the user experience by offering contextual help and details.

### Styling 

I used a mix of inline styling and CSS page styling (see App.css).


### Learn More

To learn more about React and Three.js, check out the following resources: 

- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [Three.JS Documentation](https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene)
- [Three.JS Course](https://www.youtube.com/watch?v=xJAfLdUgdc4&list=PLjcjAqAnHd1EIxV4FSZIiJZvsdrBc1Xho)


