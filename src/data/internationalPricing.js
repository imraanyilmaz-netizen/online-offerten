export const pricingData = {
  private: {
    base: 1500, // Base cost for a private move
    perRoom: 400, // Cost per room
    perKm: 2.5, // Cost per kilometer
  },
  business: {
    base: 2500, // Base cost for a business move
    perSqm: 20, // Cost per square meter
    perKm: 3.5, // Cost per kilometer
  },
  piano: {
    cost: 800, // Flat rate for piano transport
  },
  cleaning: {
    base: 300, // Base cost for cleaning with guarantee
    perRoom: 100, // Cost per room for cleaning
  },
};

// Average road distances from Switzerland (CH) to other countries in km
export const countryDistances = {
  AT_CH: 500,
  BE_CH: 700,
  CH_DE: 600,
  CH_DK: 1200,
  CH_ES: 1500,
  CH_FR: 550,
  CH_GB: 1100,
  CH_IT: 750,
  CH_LI: 100,
  CH_NL: 800,
  CH_NO: 1800,
  CH_PT: 2000,
  CH_SE: 1600,
};