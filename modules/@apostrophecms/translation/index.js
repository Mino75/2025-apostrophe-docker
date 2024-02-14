module.exports = {
  extend: '@apostrophecms/module',
  options: {
    enabled: true
  },
  init(self) {
    self.providers = [];
    self.enableBrowserData();
  },
  methods(self, options) {
    return {
      addProvider(provider) {
        self.providers.push(provider);
      },
      getProvider(name) {
        if (!name) {
          return self.providers[0];
        }

        return self.providers.find((provider) => provider.name === name);
      },
      getBrowserData(req) {
        return {
          enabled: options.enabled && Boolean(self.providers.length),
          providers: self.providers.map(({ name, label }) => ({
            name,
            label
          }))
        };
      }
    };
  }
};
