<template>
  <HeroSection />
  <AboutSection />
  <SkillsSection />
  <EducationSection />
  <ProjectsSection />
  <ContactForm />
  <Footer />
</template>

<script>
import HeroSection from './components/HeroSection.vue';
import AboutSection from './components/AboutSection.vue';
import SkillsSection from './components/SkillsSection.vue';
import EducationSection from './components/EducationSection.vue';
import ProjectsSection from './components/ProjectsSection.vue';
import ContactForm from './components/ContactForm.vue';
import Footer from './components/Footer.vue';

export default {
  components: {
    HeroSection,
    AboutSection,
    SkillsSection,
    EducationSection,
    ProjectsSection,
    ContactForm,
    Footer,
  },
};
</script>
