import { BROM, Character, ELYNDOR, NYSSA, SELENE, THANE } from '@repo/core';

type Conversation = Record<number, { text: string; backgroundImage?: string; character?: Character }>;

export const getTutorialConversation = (): Conversation => {
  const basePath = process.env.NEXT_PUBLIC_ELDORIA_BASE_PATH ?? '';

  return {
    0: {
      text: `Beneath the cloak of predawn's embrace, a figure moves with the quiet promise of youth, skirting the edges of Eldoria's grandeur.
      The city, a tapestry of towering aspirations and hushed marketplaces, slumbers under a shroud of uneasy silence, its heartbeats muffled by whispers of shadows yet unseen.`,
      backgroundImage: basePath + '/tutorial/1.png',
    },
    1: {
      text: `This is your story, etched in the fervor of dreams too vast for the confines of cobblestone realities.
      Armed with naught but the raw edge of daring and a spark of cunning, you stand at the precipice of fate, drawn inexorably to the one haven where chaos births legends: the veiled sanctum of the Thieves' Guild of Eldoria.`,
      backgroundImage: basePath + '/tutorial/2.png',
    },
    2: {
      text: `Yet, the Guild's embrace is not for the faint of heart, for its thresholds are guarded by riddles and trials, known only to those whose courage outshines the glint of steel in the moonlight.
      A trial awaits in the arena, an ancient dance of destiny where the threads of future are woven or severed.`,
      backgroundImage: basePath + '/tutorial/3.png',
    },
    3: {
      text: `With dawn's first whisper, the city's ancient bones are cast in a tapestry of shadows, and it is here you find yourself, before a gateway shrouded in secrecy, its whispers laden with promise and peril alike.
      Your heart, a drum of war and wonder, echoes the tumultuous cadence of the coming storm.
      "Step forth, child of the shadows," intones a voice, as ethereal as the morning mist, "for the fate of Eldoria is a tapestry in flux, and you seek to claim your thread amongst its hues.
      Prove your mettle, let the Guild be your crucible, your sanctuary, your kin. Falter, and fade into the annals of the forgotten, another wraith in the city's endless lament."
      Drawing a breath that tastes of destiny, you cross the threshold, the gates behind you whispering tales of those who walked this path before.
      Herein lies your odyssey, in the heart of Eldoria, where shadows sing secrets and every choice forges the path of your legacy.`,
      backgroundImage: basePath + '/tutorial/4.png',
    },
    4: {
      text: `"What name shall the echoes of these halls whisper, young aspirant?" the shadows inquire, a prelude to the saga awaiting your breath.`,
    },
    5: {
      text: `So be it, {0}. The crucible of your tale ignites this very moment. May your wit be as swift as the wind, your resolve as steadfast as the deep roots of Eldoria.
      With the resolve of a thousand whispered vows, you step forth into the arena, its gates sealing with the finality of fate's own decree...
      It stretches before you, an expanse of dust and echoes, bound by ancient stone and the weight of countless stories.
      Torches flicker in their sconces, casting a wavering glow upon the figures gathered within, each a potential ally or adversary in the crucible that awaits.
      You know that you must prove your worth to the Guild by facing different encounters in the future. Each figure you meet can become a valuable ally, or a fierce opponent.
      The more allies you gather, the easier your journey will be after this trial. However, you may choose to walk this path alone, should you seek the challenge.`,
      backgroundImage: basePath + '/tutorial/5.png',
    },
    6: {
      text: `Unexpectedly, a figure steps forward and the firelight dances across a weathered face, etched with lines deeper than any canyon.
      A shock of beard, the color of storm clouds, frames eyes that gleam like molten gold.
      Though his stature is impressive, a hint of something low-slung lurks beneath his heavy cloak.
      "They call me Thane," his voice rumbles, a tremor in the earth itself.
      "Will you stand with me, or will we test the weight of each other's steel?"`,
      backgroundImage: basePath + '/characters/encounter-0.png',
      character: THANE,
    },
    7: {
      text: `Without warning, a shadow detaches itself from the periphery, coalescing into a lithe, hooded form.
      "Call me Nyssa," she whispers, a dagger spinning lazily in her fingers.
      "The shadows are my domain. Together, we could dance through danger unseen. What say you?"`,
      backgroundImage: basePath + '/characters/encounter-1.png',
      character: NYSSA,
    },
    8: {
      text: `In a small a bulge to the side, you find an elder man in the shadows, draped in flowing robes that seem to swallow the faint light.
      No weapon hangs at his hip, no glint of steel betrays his purpose.
      Yet, his eyes burn with an intensity that speaks of power beyond the physical realm.
      "I am Elyndor," his voice a smooth caress that sends shivers down your spine.
      "Ally with me, and the very elements shall bow to our will. Or shall I test your resistance to the unknown?"`,
      backgroundImage: basePath + '/characters/encounter-2.png',
      character: ELYNDOR,
    },
    9: {
      text: `Suddenly, a warrior encased in gleaming armor strides forward, his broad shoulders filling the space with an air of restrained power.
      A dark hood obscures his features entirely, leaving only the glint of steel from his visor visible.
      "They call me Brom," his voice booms, a low rumble that vibrates through the ground.
      "Together, we could topple fortresses. But make no mistake, my kindness has limits. Choose your path wisely."`,
      backgroundImage: basePath + '/characters/encounter-3.png',
      character: BROM,
    },
    10: {
      text: `As you step further into the arena, a woman of otherworldly grace emerges.
      Her form, clad in light armor that seems almost an extension of nature itself, moves with a dancer's ease.
      Pointed ears peek through her flowing hair, a whisper of ancient lineage.
      "I am Selene," her voice lilts like a gentle breeze.
      "Walk with me, and I can guide you through darkness and light. Or will you succumb to the shadows that cling to us all?"`,
      backgroundImage: basePath + '/characters/encounter-4.png',
      character: SELENE,
    },
    11: {
      text: `Congratulations, fledgling band of shadows.
      You've weathered the whispers of doubt and forged a fragile pact beneath the watchful gaze of the Guild.
      Remember, the path ahead is a tangled skein, woven with the threads of both triumph and tribulation.
      Let your camaraderie be a shield against the coming storms, and may your cunning and courage illuminate the shadows that lurk in every corner.
      This is your odyssey, etched in the annals of legend. Go forth, and claim your destiny with the unwavering spirit of Eldoria's heroes.`,
      backgroundImage: basePath + '/tutorial/6.png',
    },
  };
};
