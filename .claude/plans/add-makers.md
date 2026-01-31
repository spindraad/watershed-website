I need to add support for Makers in the application. The end goal is that clients can add makers in the admin enviromnent with the following features:

1. Add a new maker with details such as name, creative expertise, description, and avatar image.
2. Edit existing maker details.
3. Delete a maker.
4. View a list of all makers with pagination.
   Makers can then be output in MakerProfileSummary components throughout the application.

For now, this is out of scope and will be picked up later.

For the homepage, I need an overview of a few makers. This will be a scrollable horizontal list of MakerProfileSummary components.
For reference, see tmp/scrollable-maker-overview.png

To implement this feature, you'll need to follow these steps:

1. Create a Maker model in prisma with fields for name, creative expertise, description, and avatar image URL.
2. Create a seed script to populate the database with some initial makers for testing. You can use the names and details from the screenshot. I'll provide the avatar images later.
3. Create an API route to fetch the list of makers from the database, similar to api\_/events/\_events.ts.
4. Create a standalone component with Storybook story for the scrollable horizontal list of MakerProfileSummary components. This component should receive the makers as prop and display them in a horizontal scrollable container. See components/UpcomingEvents.tsx for reference.
5. Create a Puck component that uses the new API route to fetch the makers and passes them to the scrollable list component. See UpcomingEventsBlock.tsx for reference.

## Demo data

| Name               | Profession (nl/en/pap) | Summary                  |
| ------------------ | ---------------------- | ------------------------ |
| Monique Hendriks   | Schrijver              | Stadsdichter Ploeg-E     |
| Terence van Lange  | Schrijver              | Stadsdichter Ploeg-E     |
| Corinne Heyrman    | Schrijver              | Stadsdichter Ploeg-E     |
| Jonathan Griffioen | Dichter                | Verhalen voor Saga       |
| Iris Penning       | Schrijver              | Stadsdichter (2019-2024) |
