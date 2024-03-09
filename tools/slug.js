const slugify = str =>
    str
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');

handle({
    name: 'slugHandle',
    selector: {
        actions: ['CREATE', 'UPDATE'],
        annotations: {
            EnableSlug: 'true'
        }
    },
    order: 41,
    sync: true,
    fn: (record, event) => {
        record.slug = slugify(record.title);
        return record;
    }
})