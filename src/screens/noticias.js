import React from "react";
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { WebView } from "react-native-webview";

export default function Noticias() {
  return (
    <View style={styles.container}>
      {/* Topo com Logo */}
      <View style={styles.header}>
        <Text style={styles.logo}>
          <Text style={styles.logoBlue}>Fin</Text>market
        </Text>
      </View>

      

      {/* Lista de notícias */}
      <ScrollView style={styles.newsList}>
        {/* Card com notícia fictícia */}
        <TouchableOpacity style={styles.newsCard}>
          <Text style={styles.newsText}>📊 Últimas atualizações do mercado...</Text>
        </TouchableOpacity>

        {/* Card com TradingView Widget */}
        <View style={[styles.newsCard, { height: 600, overflow: "hidden" }]}>
          <WebView
            source={{
              html: `
                <html>
                  <head>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  </head>
                  <body style="margin:0;padding:0">
                    <!-- Widget TradingView -->
                    <script type="text/javascript" src="https://s3.tradingview.com/external-embedding/embed-widget-timeline.js" async>
                    {
                      "feedMode": "all_symbols",
                      "isTransparent": false,
                      "displayMode": "compact",
                      "width": "130%",
                      "height": "140%",
                      "colorTheme": "dark"
                    }
                    </script>
                  </body>
                </html>
              `,
            }}
            style={{ flex: 1 }}
          />
        </View>
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
    width: "100%",
    borderRadius: 20,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  newsList: { flex: 1, padding: 10 },
  newsCard: {
    backgroundColor: "#132050",
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    height: 100,
    justifyContent: "center",
  },
  newsText: { color: "#fff", fontSize: 16 },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 15,
    backgroundColor: "#D9D9D9",
  },
});
