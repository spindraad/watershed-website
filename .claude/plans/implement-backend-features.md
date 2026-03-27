# Implement back-end and CRUD features for the application

We're going to implement some back-end features for our application, based on a couple of tickets in YouTrack:
- Build a Rich Text component outside of the Puck editor, that can be used in the CRUD-flow.
- Build an image selection field that, in the CRUD-flow, allows users to either select an image from the media library or upload it on the spot and save it as part of the content.
- Build a content selection field that allows users to select different content from the content library and save it as part of the content.
- Create the CRUD-flow for talent programs.
- Create the CRUD-flow for "candy shop"-items.
- Create the CRUD-flow for "candy shop"-categories.
- Create the CRUD-flow for "rubrieken".
- Create the CRUD-flow for "makers".
- Adjust the CRUD-flow for "events" to include the new Rich Text component, image selection field, and content selection field.
- Adjust the CRUD-flow for "projecten" to include the new Rich Text component, image selection field, and content selection field.

## Build a Rich Text component outside of the Puck editor
Puck has a rich text editor in their latest release which we use for the free-form content pages.
But, some of the more strict-form content types (like events and projecten) could benefit from a more structured rich text editor, that allows us to enforce certain formatting rules and styles.
We will build a custom Rich Text component that can be used in the CRUD-flow for these content types.

Since Puck has a dependency on a rich text editor, we can leverage that dependency to build our own Rich Text component that is separate from the Puck editor, but still uses the same underlying rich text editor library.
The editor should support basic formatting options like bold, italic, underline, lists, links, and images.
We will also need to ensure that the content created with this Rich Text component can be saved and retrieved correctly from the database. If we need to have a Reader component for this Rich Text content, we can build that as well, to ensure that the content is displayed correctly on the front-end.

## Build an image selection field that allows users to either select or upload an image
We have a Media library in our app where we can upload and manage images. But, for some content types we want to allow users to either select an image from the media library or upload a new image on the spot when creating or editing content.

The field should have a button to open the media library, where users can select an existing image. It should also have an option to upload a new image directly from the CRUD interface. When an image is selected or uploaded, it should be saved as part of the content and displayed correctly on the front-end.
It also has a field for the alt text, which is important for accessibility and SEO.

The image and alt text are saed in the database as part of the content, and we need to ensure that they are retrieved and displayed correctly on the front-end.

## Build a content selection field
Some content need to reference other content in the system, like an event having one or more makers connected to it. To facilitate this, we will build a content selection field that allows users to search and select existing content from the content library and save it as part of the content they are creating or editing.
This field should have a generic interface that would make it easy to use with different kinds of content:

```ts
interface SelectionFieldProps {
  label: string;
  contentType: string; // The type of content to select from (e.g. "makers", "events", "projecten")
  contentLibrary: Content[]; // The list of available content to select from, can be any of the content types in the system. Is allowed to be an enum type.
  selectedContentIds: string[]; // The IDs of the currently selected content
  onChange: (selectedContentIds: string[]) => void; // Callback when the selection changes
}
```

## Create the CRUD-flow for content types
Create the same CRUD-flow for the new content types, using the same flow as the existing content types (events, projecten, etc.) as a template. This includes creating the necessary database models, API routes, and front-end components for creating, reading, updating, and deleting content of these types.

### Create the CRUD-flow for talent programs
- id
- title
- duration
- description (PrismaJSON.Localised)
- image (url + alt)
- content (output from the Rich Text component)
- relatedCreators (this can be the IDs of related content selected with the content selection field)

### Create the CRUD-flow for "candy shop"-items
- id
- title
- description (PrismaJSON.Localised)
- image (url + alt)
- content (output from the Rich Text component)
- category (this can be the ID of a "candy shop"-category selected with the content selection field)

### Create the CRUD-flow for "candy shop"-categories
- id
- title
- description (PrismaJSON.Localised)

### Create the CRUD-flow for "rubrieken"
- id
- title
- description (PrismaJSON.Localised)
- image (url + alt)
- content (output from the Rich Text component)
- category (this can be the ID of a "rubrieken"-category selected with the content selection field)

### Create the CRUD-flow for "rubrieken"-categories
- id
- title
- description (PrismaJSON.Localised)

### Create the CRUD-flow for "makers"
- id
- name
- profession
- summary (PrismaJSON.Localised)
- slug
- imageUrl

### Adjust the CRUD-flow for "events" 
Include the new Rich Text component, image selection field, and content selection field.

### Adjust the CRUD-flow for "projecten" 
Include the new Rich Text component, image selection field, and content selection field.
