export default {
  name: "collection",
  title: "Collection",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "description",
      title: "Description",
      type: "text",
    },
    {
      name: "price",
      title: "Collection Price",
      type: "number",
      description: "Price for the entire collection (should be less than the sum of individual photo prices)",
      validation: (Rule) => Rule.required().positive(),
    },
    {
      name: "discount",
      title: "Discount Percentage",
      type: "number",
      description: "Percentage discount compared to buying photos individually (calculated automatically)",
      readOnly: true,
    },
  ],
}

