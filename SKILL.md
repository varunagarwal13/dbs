\---

name: premium-ecommerce-ui

description: Builds and polishes the project's premium dark desktop-first e-commerce UI with 21st.dev-inspired visual quality, restrained Motion animations, responsive layouts, accessible interactions, and consistent design tokens. Use when implementing or improving frontend pages, components, interactions, animations, product grids, cart, checkout, payment, orders, or visual polish.

\---



\# Premium E-Commerce UI Skill



\## Core Objective



Build a premium, production-quality desktop-first e-commerce website.



The visual target is:



\- premium dark aesthetic

\- sophisticated SaaS-quality composition

\- deep black / dark green-black background

\- muted mint/green accent

\- strong modern typography

\- high-quality product imagery

\- subtle borders

\- controlled gradients

\- restrained glow

\- cinematic product presentation

\- excellent spacing

\- polished micro-interactions



The site must feel like a high-end product, not a generic Bootstrap/Tailwind template.



\---



\# Design Principle



Premium > flashy.



Every animation must serve one of:



1\. hierarchy

2\. feedback

3\. navigation

4\. state transition

5\. depth

6\. visual continuity



Never add animation merely because it is possible.



\---



\# Visual System



Use a consistent dark palette.



Background:

near-black / deep green-black



Surface:

slightly lighter dark panels



Primary accent:

muted mint / green



Primary text:

high contrast white



Secondary text:

muted gray-green



Borders:

subtle dark/translucent borders



Effects:

very restrained green glow



Do not introduce unrelated colors.



\---



\# Typography



Use a modern premium sans-serif.



Maintain clear hierarchy:



Hero heading

Page heading

Section heading

Product name

Body

Metadata



Avoid excessive font sizes.



\---



\# Layout



Primary target widths:



1440px

1280px



The application is desktop-first.



It must gracefully adapt to smaller widths.



Do not turn the website into a mobile-app-style interface.



\---



\# Components



Prefer reusable components such as:



Navbar

Footer

Button

Input

ProductCard

ProductGrid

ProductImage

QuantitySelector

CartItem

OrderCard

OrderStatus

PaymentMethod

PageHeader

SectionReveal

AnimatedContainer



Do not duplicate identical UI logic across pages.



\---



\# Motion System



Prefer:



1\. CSS transitions for simple interactions

2\. Motion / Framer Motion for component/page animation

3\. GSAP only for effects that genuinely require timeline or scroll control



Do not introduce unnecessary animation libraries.



\---



\# Page Entrance



Use subtle:



opacity

translateY

scale



Example:



opacity: 0 → 1

translateY: 12px → 0



Keep transitions short and elegant.



\---



\# Scroll Reveal



Reveal sections when they enter the viewport.



Use:



fade

slide

small scale

stagger



Avoid dramatic movement.



\---



\# Product Cards



On hover:



\- slight elevation

\- image scale around 1.02–1.05

\- subtle border transition

\- controlled glow

\- CTA emphasis



Never use huge scaling.



Product grids may use staggered entrance animations.



\---



\# Buttons



Support:



hover

active

focus



Use subtle:



scale

brightness

background transition

glow



Never use excessive bouncing.



\---



\# Navigation



Use:



hover underline/reveal

active state

smooth color transitions



Cart count may animate when quantity changes.



Keep navigation stable and fast.



\---



\# Cart



When adding an item:



animate cart badge.



When removing:



fade/collapse the item.



When quantity changes:



animate the number/total.



Animation must never delay the actual action.



\---



\# Checkout



Use subtle state transitions.



Never hide important forms behind animation.



Prioritize usability.



\---



\# Payment



Use a short polished processing state:



Processing

↓

Success



Avoid long artificial waits.



\---



\# Order Success



Use a restrained success animation.



A checkmark may draw itself.



A subtle glow may expand behind it.



Then reveal order information.



Avoid excessive confetti.



\---



\# Hero



The hero may use:



\- subtle ambient gradient

\- slow background glow

\- product image parallax

\- text reveal

\- staggered CTA entrance

\- very subtle mouse movement



Movement must remain restrained.



The desired feeling is:



"premium"



not:



"animation showcase".



\---



\# Micro Interactions



Polish:



navigation

buttons

product cards

inputs

quantity controls

cart

tabs

forms

order states

success states



All interactions should feel intentional.



\---



\# Performance



Prefer GPU-friendly properties:



transform

opacity



Avoid continuously animating:



large blur

filter

box-shadow



unless absolutely necessary.



Lazy-load large product images.



Avoid large dependencies for tiny effects.



Respect:



prefers-reduced-motion



\---



\# Accessibility



Maintain:



keyboard navigation

visible focus states

semantic buttons

proper labels

alt text

sufficient contrast

reduced-motion support



Never sacrifice accessibility for visual effects.



\---



\# E-Commerce Pages



The UI must support:



Home

Login

Register

Products

Categories

Product Details

Cart

Checkout

Dummy Payment

Order Success

My Orders

Order Details

Customer Profile



\---



\# Database Awareness



Do not invent database fields.



Core entities:



Customer

CustomerPhone

PostalArea

Category

Product

Cart

CartItem

Order

OrderItem

Payment



Frontend should consume actual backend/API data.



Do not replace real API data with hardcoded mock data when the backend already exists.



\---



\# Error States



Every API-driven page should handle:



loading

success

empty

error



Examples:



Products loading

Products empty

Products API error

Empty cart

Order not found

Payment failure

Profile loading



Never leave blank screens.



\---



\# Feature Discipline



Do not add:



wishlist

reviews

coupons

subscriptions

vendors

delivery tracking

chat

loyalty

crypto

real payment gateway

AI chatbot



unless explicitly required by the existing project.



\---



\# Visual Consistency



Before finishing a UI change, verify:



spacing

alignment

typography

button style

card style

border treatment

image sizing

navigation

footer

responsive behavior

animation timing



All pages must feel like one product.



\---



\# Implementation Rule



Before modifying a page:



1\. inspect existing implementation

2\. understand its API/data flow

3\. preserve working functionality

4\. modify the smallest necessary area

5\. visually inspect the result

6\. test interactions



Do not rewrite working architecture without a concrete reason.

