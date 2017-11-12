function Beer(opts) {
    function Method(obj) {
        return {
            mashTemp: obj.mash_temp,
            fermentation: obj.fermentation,
            twist: obj.twist
        };
    }

    return {
        id: opts.id,
        name: opts.name,
        tagLine: opts.tagline,
        firstBrewed: opts.first_brewed,
        description: opts.description,
        imageUrl: opts.image_url,
        abv: opts.abv,
        ibu: opts.ibu,
        targetFg: opts.target_fg,
        target_og: opts.target_og,
        ebc: opts.ebc,
        srm: opts.srm,
        ph: opts.ph,
        attenuationLevel: opts.attenuation_level,
        volume: opts.volume,
        boilVolume: opts.boil_volume,
        method: new Method(opts.method),
        ingredients: opts.ingredients,
        foodPairings: opts.food_pairing,
        brewersTips: opts.brewers_tips,
        contributedBy: opts.contributed_by
    };
}

module.exports = Beer;