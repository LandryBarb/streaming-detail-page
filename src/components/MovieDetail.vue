
<script setup lang="ts">
import { ref } from 'vue';
import type { Movie } from '../types/media';
import { Play, Plus, Clock, Calendar, Film } from 'lucide-vue-next';

const movie = ref<Movie>({
    id: 'm-123',
    title: 'Cyberpunk Horizons',
    rating: 'TV-MA',
    runtime: 'PT2H15M',
    runtimeHuman: '2h 15m',
    year: 2026,
    genre: 'Sci-Fi Thriller',
    synopsis: 'In a future where memory is currency, a data smuggler discovers a conspiracy that threatens to overwrite humanitys collective consciousness.',
    // Added a placeholder image for visual context
    posterUrl: 'https://images.unsplash.com/photo-1535016120720-40c6874c3b1c?auto=format&fit=crop&w=1600&q=80',
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
    <div class="page-wrapper">
        <header class="site-header" role="banner">
            <nav class="container" aria-label="Global">
                <a href="/" class="logo">StreamFlow</a>
            </nav>
        </header>

        <main id="main-content" class="movie-detail">
            <section class="hero" aria-labelledby="movie-title">
                <div class="hero__bg" :style="{ backgroundImage: `url(${movie.posterUrl})` }"></div>
                <div class="hero__overlay"></div>

                <div class="container hero__content">
                    <span class="badge">{{ movie.rating }}</span>
                    <h1 id="movie-title" class="hero__title">{{ movie.title }}</h1>

                    <ul class="meta-list">
                        <li class="meta-list__item">
                            <Calendar class="icon-inline" aria-hidden="true" />
                            <span class="visually-hidden">Release Year: </span>
                            <time :datetime="`${movie.year}`">{{ movie.year }}</time>
                        </li>
                        <li class="meta-list__item">
                            <Clock class="icon-inline" aria-hidden="true" />
                            <span class="visually-hidden">Runtime: </span>
                            <time :datetime="`${movie.runtime}`">{{ movie.runtimeHuman }}</time>
                        </li>
                        <li class="meta-list__item">
                            <Film class="icon-inline" aria-hidden="true" />
                            <span class="visually-hidden">Genre: </span>
                            <span>{{ movie.genre }}</span>
                        </li>
                    </ul>

                    <div class="action-bar">
                        <button type="button" class="btn btn--primary" @click="handlePlay">
                            <Play class="icon" fill="currentColor" />
                            <span>Play Movie</span>
                        </button>
                        <button type="button" class="btn btn--secondary" @click="handleWatchlist">
                            <Plus class="icon" />
                            <span>Watchlist</span>
                        </button>
                    </div>
                </div>
            </section>

            <div class="container content-grid">
                <section class="synopsis" aria-labelledby="synopsis-heading">
                    <h2 id="synopsis-heading" class="section-title">Synopsis</h2>
                    <p class="synopsis__text">{{ movie.synopsis }}</p>
                </section>

                <aside class="cast-sidebar" aria-labelledby="cast-heading">
                    <h2 id="cast-heading" class="section-title">Cast & Crew</h2>
                    <ul class="cast-list">
                        <li v-for="actor in movie.cast" :key="actor.id" class="cast-list__item">
                            <div class="actor-avatar" aria-hidden="true">{{ actor.name.charAt(0) }}</div>
                            <div class="actor-info">
                                <span class="actor-name">{{ actor.name }}</span>
                                <span class="character-role">{{ actor.role }}</span>
                            </div>
                        </li>
                    </ul>
                </aside>
            </div>
        </main>

        <footer class="site-footer" role="contentinfo">
            <div class="container">
                <p>&copy; {{ new Date().getFullYear() }} StreamFlow Inc. <a href="#">Accessibility Policy</a></p>
            </div>
        </footer>
    </div>
</template>

<style lang="scss" scoped>
/* --- VARIABLES --- */
$color-bg: #141414;
$color-surface: #1f1f1f;
$color-text: #ffffff;
$color-text-muted: #a3a3a3;
$color-primary: #e50914;
$color-primary-hover: #b2070f;
$color-focus: #3b82f6; // High visibility blue for focus

$spacing-sm: 0.5rem;
$spacing-md: 1rem;
$spacing-lg: 2rem;
$spacing-xl: 4rem;

$container-width: 1200px;

/* --- RESET & BASE --- */
.page-wrapper {
    background-color: $color-bg;
    color: $color-text;
    min-height: 100vh;
    font-family: 'Inter', system-ui, sans-serif;
    display: flex;
    flex-direction: column;
}

.container {
    width: 100%;
    max-width: $container-width;
    margin: 0 auto;
    padding: 0 $spacing-md;
}

/* --- UTILITIES --- */
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

/* --- HEADER --- */
.site-header {
    padding: $spacing-md 0;
    position: absolute; /* Floating header */
    top: 0;
    left: 0;
    width: 100%;
    z-index: 10;
    background: linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, transparent 100%);

    .logo {
        font-size: 1.5rem;
        font-weight: 900;
        color: $color-primary;
        text-decoration: none;
        text-transform: uppercase;
        letter-spacing: 1px;

        &:focus-visible {
            outline: 3px solid $color-focus;
            border-radius: 4px;
        }
    }
}

/* --- HERO SECTION --- */
.hero {
    position: relative;
    min-height: 70vh; /* Takes up most of the screen */
    display: flex;
    align-items: flex-end; /* Push content to bottom */
    padding-bottom: $spacing-xl;
    
    &__bg {
        position: absolute;
        inset: 0;
        background-size: cover;
        background-position: center top;
        z-index: 0;
    }

    /* Gradient overlay for text readability */
    &__overlay {
        position: absolute;
        inset: 0;
        background: linear-gradient(
            to top, 
            $color-bg 0%, 
            rgba($color-bg, 0.8) 20%, 
            transparent 100%
        );
        z-index: 1;
    }

    &__content {
        position: relative;
        z-index: 2;
        width: 100%;
    }

    &__title {
        font-size: clamp(2.5rem, 5vw, 4.5rem); /* Responsive typography */
        font-weight: 800;
        margin: $spacing-sm 0 $spacing-md;
        line-height: 1.1;
        text-shadow: 0 2px 4px rgba(0,0,0,0.5);
    }
}

.badge {
    background-color: rgba(255,255,255,0.2);
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 0.875rem;
    font-weight: 700;
    text-transform: uppercase;
    backdrop-filter: blur(4px);
}

/* --- META LIST --- */
.meta-list {
    list-style: none;
    padding: 0;
    display: flex;
    gap: $spacing-lg;
    align-items: center;
    margin-bottom: $spacing-lg;
    color: #e5e5e5;
    font-size: 1.1rem;

    &__item {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    .icon-inline {
        width: 18px;
        height: 18px;
        opacity: 0.8;
    }

    @media (max-width: 600px) {
        flex-wrap: wrap;
        gap: $spacing-md;
        font-size: 1rem;
    }
}

/* --- ACTION BAR --- */
.action-bar {
    display: flex;
    gap: $spacing-md;
    flex-wrap: wrap;
}

.btn {
    font-size: 1.1rem;
    padding: 0.8rem 2rem;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 600;
    display: inline-flex;
    align-items: center;
    gap: 0.75rem;
    transition: all 0.2s ease;

    &:focus-visible {
        outline: 3px solid $color-focus;
        outline-offset: 4px;
    }

    .icon {
        width: 24px;
        height: 24px;
    }

    &--primary {
        background-color: $color-text;
        color: black;
        
        &:hover {
            background-color: rgba(255,255,255,0.75);
        }
    }

    &--secondary {
        background-color: rgba(109, 109, 110, 0.7);
        color: white;
        backdrop-filter: blur(10px);

        &:hover {
            background-color: rgba(109, 109, 110, 0.4);
        }
    }
}

/* --- MAIN CONTENT GRID --- */
.content-grid {
    display: grid;
    grid-template-columns: 2fr 1fr; /* 2/3 for synopsis, 1/3 for cast */
    gap: $spacing-xl;
    padding-top: $spacing-lg;
    padding-bottom: $spacing-xl;

    @media (max-width: 768px) {
        grid-template-columns: 1fr; /* Stack on mobile */
        gap: $spacing-lg;
    }
}

.section-title {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: $spacing-md;
    color: $color-text;
    border-left: 4px solid $color-primary;
    padding-left: $spacing-sm;
}

/* --- SYNOPSIS --- */
.synopsis__text {
    font-size: 1.125rem;
    line-height: 1.7;
    color: #d1d1d1;
    max-width: 65ch; /* Optimal reading length */
}

/* --- CAST SIDEBAR --- */
.cast-list {
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: $spacing-md;

    &__item {
        display: flex;
        align-items: center;
        gap: $spacing-md;
        background: $color-surface;
        padding: $spacing-sm;
        border-radius: 8px;
        transition: transform 0.2s;

        &:hover {
            transform: translateX(5px);
            background: lighten($color-surface, 5%);
        }
    }
}

.actor-avatar {
    width: 48px;
    height: 48px;
    background-color: #333;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    color: $color-text-muted;
}

.actor-info {
    display: flex;
    flex-direction: column;
}

.actor-name {
    font-weight: 600;
    color: $color-text;
}

.character-role {
    font-size: 0.875rem;
    color: $color-text-muted;
}

/* --- FOOTER --- */
.site-footer {
    margin-top: auto;
    padding: $spacing-lg 0;
    text-align: center;
    color: $color-text-muted;
    border-top: 1px solid #333;
    font-size: 0.875rem;

    a {
        color: $color-text-muted;
        text-decoration: underline;
        
        &:hover { color: $color-text; }
    }
}

/* --- REDUCED MOTION --- */
@media (prefers-reduced-motion: reduce) {
    *, ::before, ::after {
        animation-duration: 0.01ms !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
    }
}
</style>

