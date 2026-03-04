const aboutDescription =
  'Hive is a logo design agency crafting timeless, versatile identities that help businesses stand out and grow.';

const statsItems = [
  {
    title: 'Logos designed',
    value: '150+',
  },
  {
    title: 'Industries served',
    value: '10+',
  },
  {
    title: 'Awards & mentions',
    value: '5',
  },
  {
    title: 'Client satisfaction',
    value: '99%',
  },
];

export const AboutIntro = () => {
  return (
    <section className="section-padding bigger-container space-y-16 md:space-y-18">
      <div className="container grid items-center gap-10 md:grid-cols-2">
        <h2 className="text-4xl">About</h2>

        <p className="text-muted-foreground md:text-lg lg:text-xl">
          {aboutDescription}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <img
          width={924}
          height={664}
          src="/images/homepage/about-team.webp"
          alt="Hive team members"
          className="size-full object-cover"
        />
        <img
          width={924}
          height={664}
          src="/images/homepage/about-award.webp"
          alt="Award badge"
          className="size-full object-cover dark:invert"
        />
      </div>

      <div className="container grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {statsItems.map((item, index) => (
          <div key={index} className="space-y-2 text-lg">
            <h3 className="text-muted-foreground">{item.title}</h3>
            <p>{item.value}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
