import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { WebView } from "react-native-webview";

export default function HomeGraphics() {
  const [favorites, setFavorites] = useState({});
  const [alerts, setAlerts] = useState({});

  // Alternar favorito
  const toggleFavorite = (symbol) => {
    setFavorites((prev) => ({ ...prev, [symbol]: !prev[symbol] }));
  };

  // Alternar notificação
  const toggleAlert = (symbol) => {
    setAlerts((prev) => ({ ...prev, [symbol]: !prev[symbol] }));
  };

  return (
    <View style={styles.container}>
      {/* Topo com Logo */}
      <View style={styles.header}>
        <Text style={styles.logo}>
          <Text style={styles.logoBlue}>Fin</Text>market
        </Text>
      </View>

      {/* Barra de pesquisa */}
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Pesquisar ativos..."
          placeholderTextColor="#999"
          style={styles.searchInput}
        />
      </View>

      {/* Lista de gráficos */}
      <ScrollView style={styles.chartList}>
        {["AAPL", "TSLA"].map((symbol, index) => (
          <View key={index} style={styles.chartCard}>
            {/* Cabeçalho com título e ícones */}
            <View style={styles.cardHeader}>
              <Text style={styles.assetName}>📈 {symbol}</Text>
              <View style={styles.iconsRight}>
                <TouchableOpacity onPress={() => toggleFavorite(symbol)}>
                  <FontAwesome
                    name={favorites[symbol] ? "star" : "star-o"}
                    size={22}
                    color={favorites[symbol] ? "#FFD700" : "#fff"}
                    style={{ marginRight: 15 }}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => toggleAlert(symbol)}>
                  <Ionicons
                    name={alerts[symbol] ? "notifications" : "notifications-outline"}
                    size={22}
                    color={alerts[symbol] ? "#1A73E8" : "#fff"}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* WebView com gráfico TradingView */}
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
        ))}
      </ScrollView>

      {/* Barra inferior */}
  
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
    overflow: "hidden",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    alignItems: "center",
  },
  assetName: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  iconsRight: { flexDirection: "row", alignItems: "center" },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 15,
    backgroundColor: "#D9D9D9",
  },
});
