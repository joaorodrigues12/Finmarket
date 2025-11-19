import React, { useState } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  RefreshControl 
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Dados mockados de notícias
const MOCK_NEWS = {
  all: [
    {
      id: 1,
      title: "Mercado em alta com expectativas positivas",
      summary: "Análise gerada por IA indica tendência de alta para os próximos dias. Investidores otimistas com o cenário econômico.",
      sentiment: "positive",
      category: "market",
      timestamp: new Date().toISOString(),
      source: "AI Analysis",
    },
    {
      id: 2,
      title: "Tech stocks mostram volatilidade",
      summary: "IA detecta padrões de volatilidade em ações de tecnologia. Mercado reage a mudanças no setor.",
      sentiment: "neutral",
      category: "tech",
      timestamp: new Date(Date.now() - 60000).toISOString(),
      source: "Market Watch",
    },
    {
      id: 3,
      title: "Reinforces Community Narrative of Consistent Earnings Quality",
      summary: "A Tiptree reportou margens de lucro líquido de 2,4%, com crescimento de lucro de 24,4%, ligeiramente abaixo da média de cinco anos.",
      sentiment: "neutral",
      category: "market",
      timestamp: new Date(Date.now() - 120000).toISOString(),
      source: "Yahoo Entertainment",
    },
    {
      id: 4,
      title: "Madison Square Garden Entertainment",
      summary: "Análise de desempenho da MSG Entertainment mostra crescimento consistente no setor de entretenimento.",
      sentiment: "positive",
      category: "market",
      timestamp: new Date(Date.now() - 180000).toISOString(),
      source: "Financial News",
    },
    {
      id: 5,
      title: "Criptomoedas apresentam recuperação",
      summary: "Bitcoin e Ethereum mostram sinais de recuperação após período de baixa. Analistas preveem tendência positiva.",
      sentiment: "positive",
      category: "crypto",
      timestamp: new Date(Date.now() - 240000).toISOString(),
      source: "Crypto Insider",
    },
  ],
  market: [
    {
      id: 1,
      title: "Mercado em alta com expectativas positivas",
      summary: "Análise gerada por IA indica tendência de alta para os próximos dias. Investidores otimistas com o cenário econômico.",
      sentiment: "positive",
      category: "market",
      timestamp: new Date().toISOString(),
      source: "AI Analysis",
    },
    {
      id: 3,
      title: "Reinforces Community Narrative of Consistent Earnings Quality",
      summary: "A Tiptree reportou margens de lucro líquido de 2,4%, com crescimento de lucro de 24,4%, ligeiramente abaixo da média de cinco anos.",
      sentiment: "neutral",
      category: "market",
      timestamp: new Date(Date.now() - 120000).toISOString(),
      source: "Yahoo Entertainment",
    },
    {
      id: 4,
      title: "Madison Square Garden Entertainment",
      summary: "Análise de desempenho da MSG Entertainment mostra crescimento consistente no setor de entretenimento.",
      sentiment: "positive",
      category: "market",
      timestamp: new Date(Date.now() - 180000).toISOString(),
      source: "Financial News",
    },
  ],
  tech: [
    {
      id: 2,
      title: "Tech stocks mostram volatilidade",
      summary: "IA detecta padrões de volatilidade em ações de tecnologia. Mercado reage a mudanças no setor.",
      sentiment: "neutral",
      category: "tech",
      timestamp: new Date(Date.now() - 60000).toISOString(),
      source: "Market Watch",
    },
    {
      id: 6,
      title: "Apple anuncia novos produtos para 2025",
      summary: "Gigante da tecnologia prepara lançamentos inovadores que devem impactar o mercado de dispositivos móveis.",
      sentiment: "positive",
      category: "tech",
      timestamp: new Date(Date.now() - 300000).toISOString(),
      source: "Tech News",
    },
  ],
  crypto: [
    {
      id: 5,
      title: "Criptomoedas apresentam recuperação",
      summary: "Bitcoin e Ethereum mostram sinais de recuperação após período de baixa. Analistas preveem tendência positiva.",
      sentiment: "positive",
      category: "crypto",
      timestamp: new Date(Date.now() - 240000).toISOString(),
      source: "Crypto Insider",
    },
    {
      id: 7,
      title: "Nova regulação para criptomoedas",
      summary: "Governo anuncia novas regras para o mercado de criptomoedas visando maior segurança para investidores.",
      sentiment: "neutral",
      category: "crypto",
      timestamp: new Date(Date.now() - 360000).toISOString(),
      source: "Crypto Regulation",
    },
  ],
};

const MOCK_INSIGHTS = {
  summary: "As ações da AAPL, GOOGL e MSFT apresentaram um desempenho positivo no período de 1 dia.",
  confidence: 0.80,
};

export default function Noticias() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [refreshing, setRefreshing] = useState(false);

  const news = MOCK_NEWS[selectedCategory] || MOCK_NEWS.all;
  const insights = MOCK_INSIGHTS;

  const onRefresh = () => {
    setRefreshing(true);
    // Simula um refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
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
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.logo}>
            <Text style={styles.logoBlue}>Fin</Text>market
          </Text>
        </View>

        {/* AI Insights Card */}
        <View style={styles.insightsCard}>
          <View style={styles.insightsHeader}>
            <Ionicons name="bulb" size={20} color="#FFD700" />
            <Text style={styles.insightsTitle}>Insights do Mercado</Text>
          </View>
          <Text style={styles.insightsText}>{insights.summary}</Text>
          <Text style={styles.confidenceText}>
            Confiança: {(insights.confidence * 100).toFixed(0)}%
          </Text>
        </View>

        {/* Category Filters */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesContainer}
          contentContainerStyle={styles.categoriesContent}
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
        <View style={styles.newsContainer}>
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
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#0A1033",
  },
  scrollView: {
    flex: 1,
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
    color: "#000",
  },
  logoBlue: { 
    color: "#1A73E8",
  },
  insightsCard: {
    backgroundColor: "#1A2B5F",
    marginHorizontal: 15,
    marginTop: 15,
    marginBottom: 10,
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
    maxHeight: 50,
    marginBottom: 5,
  },
  categoriesContent: {
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  categoryChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#1A73E8",
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
  newsContainer: {
    paddingHorizontal: 15,
    paddingTop: 5,
    paddingBottom: 20,
  },
  newsCard: {
    backgroundColor: "#132050",
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
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
