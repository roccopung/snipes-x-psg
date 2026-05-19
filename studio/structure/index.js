export const structure = (S, context) =>
  S.list()
    .id("root")
    .title("Content")
    .items([
      S.documentTypeListItem("home")
        .title("Home")
        .child(
          S.document().schemaType("home").title("Home").documentId("home"),
        ),
    ]);
