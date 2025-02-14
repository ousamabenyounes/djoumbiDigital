#!/bin/bash

# Création du dossier images s'il n'existe pas
mkdir -p public/images

# Nettoyage du dossier images existant
rm -f public/images/*.jpg

# Téléchargement des images individuellement
echo "Téléchargement de hero-bg.jpg..."
curl -L "https://picsum.photos/1920/1080" -o "public/images/hero-bg.jpg"

echo "Téléchargement de it-services.jpg..."
curl -L "https://picsum.photos/1920/1080?random=1" -o "public/images/it-services.jpg"

echo "Téléchargement de ai-coaching.jpg..."
curl -L "https://picsum.photos/1920/1080?random=2" -o "public/images/ai-coaching.jpg"

echo "Téléchargement de acquisition.jpg..."
curl -L "https://picsum.photos/1920/1080?random=3" -o "public/images/acquisition.jpg"

echo "Téléchargement de services-hero.jpg..."
curl -L "https://picsum.photos/1920/1080?random=4" -o "public/images/services-hero.jpg"

# Vérification des fichiers téléchargés
for img in public/images/*.jpg; do
    size=$(stat -f%z "$img")
    if [ $size -eq 0 ]; then
        echo "⚠️  Erreur: $img est vide"
    else
        echo "✓ $img téléchargé avec succès ($size bytes)"
    fi
done

echo "Téléchargement terminé!" 