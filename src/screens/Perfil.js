import React, { useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet, ScrollView } from "react-native";
import { WebView } from "react-native-webview";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Perfil() {
  const [favorites, setFavorites] = useState([]);

  // Buscar favoritos salvos no AsyncStorage
  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const saved = await AsyncStorage.getItem("favorites");
        if (saved) {
          setFavorites(JSON.parse(saved));
        }
      } catch (error) {
        console.log("Erro ao carregar favoritos", error);
      }
    };
    loadFavorites();
  }, []);

  return (
    <View style={styles.container}>
      {/* Topo com logo */}
      <View style={styles.header}>
        <Text style={styles.logo}>
          <Text style={styles.logoBlue}>Fin</Text>market
        </Text>
      </View>

      {/* Barra de pesquisa (para filtrar favoritos) */}
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Pesquisar nos favoritos..."
          placeholderTextColor="#999"
          style={styles.searchInput}
        />
      </View>

      {/* Lista de favoritos */}
      <ScrollView style={styles.chartList}>
        {favorites.length === 0 ? (
          <Text style={styles.emptyText}>Nenhum favorito marcado ainda ⭐</Text>
        ) : (
          favorites.map((symbol, index) => (
            <View key={index} style={styles.chartCard}>
              <Text style={styles.assetName}>⭐ {symbol}</Text>
              <View style={{ height: 250 }}>
                <WebView
                  source={{
                    html: `
                      <html>
                        <head>
                          <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        </head>
                        <body style="margin:0;padding:0">
                          <script type="text/javascript" src="https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js" async>
                          {
                            "symbol": "NASDAQ:${symbol}",
                            "width": "100%",
                            "height": "100%",
                            "locale": "br",
                            "dateRange": "12M",
                            "colorTheme": "dark",
                            "trendLineColor": "#37a6ef",
                            "underLineColor": "rgba(55, 166, 239, 0.3)",
                            "isTransparent": false
                          }
                          </script>
                        </body>
                      </html>
                    `,
                  }}
                  style={{ flex: 1 }}
                />
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0A1033" },
  header: {
    width: "100%",
    padding: 20,
    backgroundColor: "#D9D9D9",
    alignItems: "center",
     marginTop: 10,
  },
  logo: { fontSize: 22, fontWeight: "bold", color: "#000" },
  logoBlue: { color: "#1A73E8" },
  searchContainer: { padding: 10, alignItems: "center" },
  searchInput: {
    backgroundColor: "#fff",
    width: "90%",
    borderRadius: 20,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  chartList: { flex: 1, padding: 10 },
  chartCard: {
    backgroundColor: "#132050",
    borderRadius: 12,
    marginBottom: 20,
    padding: 10,
  },
  assetName: { color: "#fff", fontSize: 16, fontWeight: "bold", marginBottom: 10 },
  emptyText: {
    color: "#ccc",
    textAlign: "center",
    marginTop: 50,
    fontSize: 16,
  },
});
