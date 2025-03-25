export default {
    name: "blogPost",
    title: "Blog Post",
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
        name: "publishedAt",
        title: "Published At",
        type: "datetime",
        validation: (Rule) => Rule.required(),
      },
      {
        name: "author",
        title: "Author",
        type: "string",
        validation: (Rule) => Rule.required(),
      },
      {
        name: "featuredImage",
        title: "Featured Image",
        type: "image",
        options: {
          hotspot: true,
        },
      },
      {
        name: "excerpt",
        title: "Excerpt",
        type: "text",
        description: "A short summary of the blog post",
      },
      {
        name: "collection",
        title: "Related Collection",
        type: "reference",
        to: [{ type: "collection" }],
        description: "Link to a photo collection related to this blog post",
      },
      {
        name: "content",
        title: "Content",
        type: "array",
        of: [
          {
            type: "block",
          },
          {
            type: "image",
            options: {
              hotspot: true,
            },
            fields: [
              {
                name: "caption",
                type: "string",
                title: "Caption",
                options: {
                  isHighlighted: true,
                },
              },
              {
                name: "alt",
                type: "string",
                title: "Alternative text",
                description: "Important for SEO and accessibility.",
                options: {
                  isHighlighted: true,
                },
              },
            ],
          },
        ],
      },
    ],
    preview: {
      select: {
        title: "title",
        author: "author",
        media: "featuredImage",
      },
      prepare(selection) {
        const { author } = selection
        return {
          ...selection,
          subtitle: author && `by ${author}`,
        }
      },
    },
  }
  
  