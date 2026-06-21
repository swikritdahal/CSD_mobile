// App.tsx
import React, { useState } from "react";
import { Alert, Button, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Prediction = {
  label: string;
  confidence: number;
} | null;

export default function App() {
  const [prediction, setPrediction] = useState<Prediction>(null);

  const handleRecordPress = () => {
    Alert.alert("Recording logic will be added later");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Car Sound Diagnosis</Text>

      <View style={styles.buttonRow}>
        <Button title="Record 5s" onPress={handleRecordPress} />
      </View>

      <View style={styles.resultBox}>
        <Text style={styles.resultTitle}>Prediction</Text>
        {prediction ? (
          <>
            <Text style={styles.predLabel}>{prediction.label}</Text>
            <Text style={styles.predConf}>
              Confidence: {(prediction.confidence * 100).toFixed(1)}%
            </Text>
          </>
        ) : (
          <Text style={styles.predNone}>No result yet</Text>
        )}
      </View>

      <View style={styles.spectrogramBox}>
        <Text style={styles.specTitle}>Spectrogram (visual)</Text>
        <View style={styles.specPlaceholder}>
          <Text style={{ color: "#aaa" }}>Spectrogram will appear here</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, alignItems: "center", backgroundColor: "#fff" },
  title: { fontSize: 20, fontWeight: "600", marginBottom: 12 },
  buttonRow: { flexDirection: "row", marginBottom: 12 },
  resultBox: { width: "90%", padding: 12, borderWidth: 1, borderRadius: 8, marginBottom: 12 },
  resultTitle: { fontSize: 16, fontWeight: "600" },
  predLabel: { fontSize: 18, fontWeight: "700", marginTop: 8 },
  predConf: { fontSize: 14, color: "#333", marginTop: 4 },
  predNone: { color: "#666", marginTop: 8 },
  spectrogramBox: { width: "100%", alignItems: "center" },
  specTitle: { fontSize: 16, marginBottom: 8 },
  specPlaceholder: {
    width: 300,
    height: 300,
    backgroundColor: "#111",
    alignItems: "center",
    justifyContent: "center",
  },
});
