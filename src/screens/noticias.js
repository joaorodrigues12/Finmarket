import React, { useState, useEffect } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  ActivityIndicator,
  RefreshControl 
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ApiService from "../services/api";

export default function Noticias() {
  const [news, setNews] = useState([]);
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    loadNews();
    loadInsights();
  }, [selectedCategory]);

  const loadNews = async () => {
    try {
      setLoading(true);
      const filters = selectedCategory !== 'all' ? { category: selectedCategory } : {};
      const data = await ApiService.getNews(filters);
      setNews(data.news || []);
    } catch (error) {
      console.error('Erro ao carregar notícias:', error);
      // Dados mock para desenvolvimento
      setNews([
        {
          id: 1,
          title: "Mercado em alta com expectativas positivas",
          summary: "Análise gerada por IA indica tendência de alta para os próximos dias...",
          sentiment: "positive",
          category: "market",
          timestamp: new Date().toISOString(),
        },
        {
          id: 2,
          title: "Tech stocks mostram volatilidade",
          summary: "IA detecta padrões de volatilidade em ações de tecnologia...",
          sentiment: "neutral",
          category: "tech",
          timestamp: new Date().toISOString(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const loadInsights = async () => {
    try {
      const data = await ApiService.getMarketInsights(['AAPL', 'GOOGL', 'MSFT']);
      setInsights(data);
    } catch (error) {
      console.error('Erro ao carregar insights:', error);
      // Mock data
      setInsights({
        summary: "Mercado apresenta tendência positiva com base em análise de IA",
        confidence: 0.85,
      });
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadNews();
    await loadInsights();
    setRefreshing(false);
  };

  const getSentimentIcon = (sentiment) => {
    switch (sentiment) {
      case 'positive': return '📈';
      case 'negative': return '📉';
      default: return '📊';
    }
  };

  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case 'positive': return '#4CAF50';
      case 'negative': return '#F44336';
      default: return '#FFC107';
    }
  };

  const categories = [
    { id: 'all', label: 'Todas', icon: 'apps-outline' },
    { id: 'market', label: 'Mercado', icon: 'trending-up-outline' },
    { id: 'tech', label: 'Tech', icon: 'hardware-chip-outline' },
    { id: 'crypto', label: 'Cripto', icon: 'logo-bitcoin' },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>
          <Text style={styles.logoBlue}>Fin</Text>market
        </Text>
      </View>

      {/* AI Insights Card */}
      {insights && (
        <View style={styles.insightsCard}>
          <View style={styles.insightsHeader}>
            <Ionicons name="bulb" size={20} color="#FFD700" />
            <Text style={styles.insightsTitle}>Insights do Mercado</Text>
          </View>
          <Text style={styles.insightsText}>{insights.summary}</Text>
          {insights.confidence && (
            <Text style={styles.confidenceText}>
              Confiança: {(insights.confidence * 100).toFixed(0)}%
            </Text>
          )}
        </View>
      )}

      {/* Category Filters */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer}
      >
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat.id}
            style={[
              styles.categoryChip,
              selectedCategory === cat.id && styles.categoryChipActive
            ]}
            onPress={() => setSelectedCategory(cat.id)}
          >
            <Ionicons 
              name={cat.icon} 
              size={16} 
              color={selectedCategory === cat.id ? '#fff' : '#1A73E8'} 
            />
            <Text style={[
              styles.categoryText,
              selectedCategory === cat.id && styles.categoryTextActive
            ]}>
              {cat.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* News List */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#1A73E8" />
          <Text style={styles.loadingText}>Gerando notícias com IA...</Text>
        </View>
      ) : (
        <ScrollView 
          style={styles.newsList}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {news.map((item) => (
            <TouchableOpacity key={item.id} style={styles.newsCard}>
              <View style={styles.newsHeader}>
                <Text style={styles.sentimentIcon}>
                  {getSentimentIcon(item.sentiment)}
                </Text>
                <View style={styles.newsHeaderText}>
                  <Text style={styles.newsTitle}>{item.title}</Text>
                  <View style={styles.newsMetaRow}>
                    <Text style={styles.newsTime}>
                      {new Date(item.timestamp).toLocaleTimeString('pt-BR', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </Text>
                    {item.source && (
                      <>
                        <Text style={styles.newsDivider}> • </Text>
                        <Text style={styles.newsSource}>{item.source}</Text>
                      </>
                    )}
                  </View>
                </View>
              </View>
              <Text style={styles.newsSummary}>{item.summary}</Text>
              <View style={[
                styles.sentimentBadge,
                { backgroundColor: getSentimentColor(item.sentiment) }
              ]}>
                <Text style={styles.sentimentText}>
                  {item.sentiment === 'positive' ? 'Positivo' : 
                   item.sentiment === 'negative' ? 'Negativo' : 'Neutro'}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#0A1033" 
  },
  header: {
    width: "100%",
    padding: 20,
    backgroundColor: "#D9D9D9",
    alignItems: "center",
    marginTop: 10,
  },
  logo: { 
    fontSize: 22, 
    fontWeight: "bold", 
    color: "#000" 
  },
  logoBlue: { 
    color: "#1A73E8" 
  },

  insightsCard: {
    backgroundColor: "#1A2B5F",
    margin: 15,
    padding: 15,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#FFD700",
  },
  insightsHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  insightsTitle: {
    color: "#FFD700",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
  insightsText: {
    color: "#fff",
    fontSize: 14,
    lineHeight: 20,
  },
  confidenceText: {
    color: "#4CAF50",
    fontSize: 12,
    marginTop: 8,
    fontWeight: "600",
  },
  categoriesContainer: {
    paddingHorizontal: 15,
    paddingTop: 10,
    paddingBottom: 0,
  },
  categoryChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#1A73E8",
    height: 40,
  },
  categoryChipActive: {
    backgroundColor: "#1A73E8",
    borderColor: "#1A73E8",
  },
  categoryText: {
    color: "#1A73E8",
    fontSize: 14,
    marginLeft: 5,
    fontWeight: "600",
  },
  categoryTextActive: {
    color: "#fff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    color: "#fff",
    marginTop: 10,
    fontSize: 14,
  },
  newsList: { 
    flex: 1, 
    paddingHorizontal: 15,
    paddingTop: 0,
    paddingBottom: 15,
  },
  newsCard: {
    backgroundColor: "#132050",
    padding: 15,
    borderRadius: 12,
    marginTop: 10,
    marginBottom: 15,
    borderLeftWidth: 3,
    borderLeftColor: "#1A73E8",
  },
  newsHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  sentimentIcon: {
    fontSize: 24,
    marginRight: 10,
  },
  newsHeaderText: {
    flex: 1,
  },
  newsTitle: { 
    color: "#fff", 
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  newsMetaRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  newsTime: {
    color: "#888",
    fontSize: 12,
  },
  newsDivider: {
    color: "#666",
    fontSize: 12,
  },
  newsSource: {
    color: "#1A73E8",
    fontSize: 12,
    fontWeight: "600",
  },
  newsSummary: {
    color: "#ccc",
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 10,
  },
  sentimentBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  sentimentText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
});
