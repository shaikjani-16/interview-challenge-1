## TASKS

- [x] Fixed carousel scrolling UI: When navigation buttons are clicked, ensure a new image is shown. Additionally, center the carousel navigation buttons vertically relative to the image.
- [x] Replaced dummy images by fetching each album of post using "https://jsonplaceholder.typicode.com/albums/1/photos" in /api/v1/posts route.
- [x] Fixed top nav bar sticky during scrolling.
- [x] Implemented functionality to load more posts upon clicking the "Load More" button. Hide the "Load More" button if no posts exist.
- [x] Displayed the user's name and email in each post. Show the first letter for both the first and last names.
      
![image](https://github.com/user-attachments/assets/0f1646ee-cf16-4098-a43a-fc4adf5082c5)
![image](https://github.com/user-attachments/assets/c4d960c0-13ca-40b4-8923-686366193e86)

- [x] Converted `UserList` React class component to functional component and convert `witUserData` HOC (Higher order Component) to a custom React hooks
- [x] Converted `useWindowWidth` hook to ContextAPI. Declared the ContextAPI globally and access the `isSmallerDevice` property.
