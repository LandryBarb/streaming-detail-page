<script setup lang="ts">
    import { ref } from 'vue';
    import type { Movie } from '../types/media'
    import { Play, Plus } from 'lucide-vue-next';

    const movie = ref<Movie>({
        id: 'm-123',
        title: 'Cyberpunk Horizons',
        rating: 'TV-MA',
        runtime: 'PT2H15M',
        runtimeHuman: '2h 15m',
        year: 2026,
        genre: 'Sci-Fi Thriller',
        synopsis: 'In a future where memory is currency, a data smuggler discovers a conspiracy that threatens to overwrite humanitys collective consciousness.',
        cast: [
            { id: 'c1', name: 'Elena Vance', role: 'Protagonist' },
    { id: 'c2', name: 'Marcus Steel', role: 'Antagonist' },
    { id: 'c3', name: 'A.I. Unit 7', role: 'Support' },
        ]
    });

    const handlePlay = () => console.log('Playing movie...');
    const handleWatchlist = () => console.log('Added to watchlist');
</script>

<template>
    <header class="site-header" role="banner">
<nav aria-label="Global">
    <a href="/" class="logo">StreamFlow</a>

</nav>

<main id="main-content" class="movie-detail">
    <section class="hero" aria-labelledby="movie-title">
        <h1 id="movie-title" class="hero__title">{{ movie.title }}</h1>
        <ul class="meta-list">
<li class="meta-list__item">
    <span class="visually-hidden">Release Year: </span>
    <time :datetime="`${movie.year}`">{{ movie.year }}</time>
</li>
<li class="meta-list__item">
    <span class="visually-hidden">Runtime: </span>
    <time :datetime="`${movie.runtime}`">{{ movie.runtimeHuman }}</time>
</li>
<li class="meta-list__item">
    <span class="visually-hidden">Genre: </span>
    <time :datetime="`${movie.genre}`">{{ movie.genre }}</time>
</li>
        </ul>

        <div class="action-bar">
            <button type="button" class="btn btn--primary"
            @click="handlePlay">
<span class="icon"><Play/></span>
            </button>
            <button type="button" class="btn btn--secondary" @click="handleWatchlist">
          <span class="icon" aria-hidden="true"><Plus/></span> Add to Watchlist
        </button>
        </div>

    </section>

    <div class="content-grid">
        <section class="synopsis" aria-labelledby="synopsis-heading">
            <h2 id="synopsis-heading">Synopsis</h2>
            <p>{{ movie.synopsis }}</p>

        </section>
        <aside class="cast-sidebar" aria-labelledby="cast-heading">
            <h2 id="cast-heading">Cast</h2>
            <li v-for="actor in movie.cast" :key="actor.id"
            class="caset-list__item"
            >
            <span class="actor-name">{{ actor.name }}</span>
            <span class="visually-hidden">as</span>

            <span class="character-role">{{ actor.role }}</span>


            </li>

        </aside>
    </div>
</main>
<footer class="site-footer" role="contentinfo">
    <p>&copy; {{ new Date().getFullYear() }} StreamFlow Inc. <a href="#">Accessibility Policy</a></p>
  </footer>
    </header>
</template>
<style lang="scss" scoped>
/* SCSS implementation focusing on:
   1. Visibility
   2. Focus States (WCAG 2.4.7)
   3. Reduced Motion
*/

// Variables
$color-bg: #141414;
$color-text: #ffffff;
$color-primary: #e50914;
$color-focus: #ffffff; // High contrast focus ring

.movie-detail {
  padding: 2rem;
  color: $color-text;
}

// Visually Hidden (Standard accessible hiding pattern)
.visually-hidden {
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
  white-space: nowrap;
}

// Focus Visible Implementation
:focus-visible {
  outline: 3px solid $color-focus;
  outline-offset: 4px;
  border-radius: 2px;
}

// Buttons
.btn {
  font-size: 1.2rem;
  padding: 0.8rem 1.5rem;
  border: none;
  cursor: pointer;
  font-weight: bold;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  
  // Transition for hover, but respected by prefers-reduced-motion below
  transition: transform 0.2s ease, background-color 0.2s;

  &--primary {
    background-color: $color-primary;
    color: white;
  }

  &--secondary {
    background-color: rgba(255, 255, 255, 0.2);
    color: white;
  }
}

// Metadata List
.meta-list {
  list-style: none;
  padding: 0;
  display: flex;
  gap: 1rem;
  align-items: center;
  color: #a3a3a3; // Ensure contrast ratio > 4.5:1 against black
  
  &__item {
    display: flex;
    align-items: center;
  }
}

// Responsive Layout
.content-grid {
  display: grid;
  grid-template-columns: 2fr 1fr; // Main synopsis vs Aside sidebar
  gap: 2rem;
  margin-top: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

// Respecting User Preferences
@media (prefers-reduced-motion: reduce) {
  *, ::before, ::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
</style>