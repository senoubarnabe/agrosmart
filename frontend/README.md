# AgroSmart Mobile

Application React Native/Expo TypeScript reproduisant la maquette Stitch AgroSmart IoT Irrigation.

## Lancer

```powershell
cd C:\Projet\AGRI\frontend
npm install
npm start
```

Ensuite, ouvrir avec Expo Go, un emulateur Android/iOS, ou le mode web Expo.

Pour un iPhone avec Expo Go :

```powershell
cd C:\Projet\AGRI\frontend
npx expo start --lan
```

Scanner le QR code affiche par Expo Go. Le telephone et le PC doivent etre sur le meme reseau Wi-Fi.

Preview web locale actuelle :

```text
http://localhost:4173
http://192.168.1.189:4173
```

## Etat actuel

- Frontend uniquement.
- Donnees capteurs simulees.
- Aucune connexion backend ou IoT reelle.
- Navigation React Navigation avec onglets bas : Accueil, Cultures, Meteo, Alertes, Parametres.
- Les ecrans couvrent le parcours de soutenance : splash, profil, notifications, culture, capteurs, succes, tableau de bord, cultures, meteo, alertes, programme, commande manuelle, previsions detaillees et parametres.
