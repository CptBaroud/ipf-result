<template>
  <DecorationTextBg text="Classement - Classement" />

  <section class="w-full">
    <div class="w-full container flex-col items-start">
      <h1 class="text-6xl md:text-9xl font-black uppercase">Classement</h1>
      <div class="flex flex-row items-center justify-center pt-16">
        <h2 class="text-4xl mr-2 uppercase font-semibold">Total :</h2>
        <UiTagGroup :tags="[
          { text: 'kg', value: 'total', type: 'classic' },
          { text: 'ipf', value: 'ipfPoint', type: 'classic' },
        ]" :active="totalActive" @update="(value) => totalActive = value" />
      </div>
      <div class="flex w-full flex-row flex-wrap gap-4 justify-between py-4">
        <UiTagGroup :tags="[
          { text: 'Open', value: 'Open', type: 'classic' },
          { text: 'Seniors', value: 'Seniors', type: 'classic' },
          { text: 'Sub-Juniors', value: 'Sub-Juniors', type: 'classic' },
          { text: 'Masters', value: 'Masters', type: 'classic' },
          { text: 'Juniors', value: 'Juniors', type: 'classic' },
        ]" :active="divisonActive" @update="(value) => divisonActive = value" />
        <UiTagGroup :tags="[
          { text: 'Tout', value: 'T', type: 'all' },
          { text: 'Femme', value: 'F', type: 'women' },
          { text: 'Homme', value: 'M', type: 'men' },
        ]" :active="sexActive" @update="(value) => sexActive = value" />
      </div>
    </div>
    <div class="w-full container pt-16 grid grid-rows-4 grid-cols-1 items-start xs:grid-rows-2 xs:grid-cols-2 justify-between gap-x-8 md:gap-x-64 gap-y-16">
      <RankingData title="squat" :data="c" k="squat" />
      <RankingData title="bench" :data="c" k="bench" />
      <RankingData title="deadlift" :data="c" k="deadlft" />
      <RankingData title="total" :data="c" :k="totalActive" />
    </div>
  </section>
</template>

<script setup>
const totalActive = ref("total");
const divisonActive = ref('Open');
const sexActive = ref('T');

const { data } = await useAsyncData('ranking', async () => {
  const item = await queryContent('/ranking').findOne();

  return item.ranking;
})

const c = computed(() => {

  return data.value
  .filter((item) => {
    if (divisonActive.value === 'Open') return item

    return item.division.includes(divisonActive.value);
  })
  .filter((item) => {
    if (sexActive.value === 'T') return item

    return item.sex === sexActive.value
  })
})

useHead({
  title: "ASBR - Classement",
});

useSeoMeta({
  title: "ASBR - Classement",
  ogTitle: "ASBR - Classement",
  ogType: "article",
  description: "Retrouvez ici le classemnt des membres de l'ASBR en fonction de la divison et du sexe de chaques mouvement et du total réalisé au KG ou par point IPF",
  ogDescription: "Retrouvez ici le classemnt des membres de l'ASBR en fonction de la divison et du sexe de chaques mouvement et du total réalisé au KG ou par point IPF",
  twitterCard: "summary_large_image",
});
</script>
