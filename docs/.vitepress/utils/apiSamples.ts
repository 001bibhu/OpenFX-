export type ApiLanguage =
  | 'curl'
  | 'javascript'
  | 'python'
  | 'ruby'
  | 'java'
  | 'cpp'
  | 'go'
  | 'php'
  | 'html'
  | 'json'

export const API_LANGUAGES: { id: ApiLanguage; label: string }[] = [
  { id: 'curl', label: 'cURL' },
  { id: 'javascript', label: 'Node.js' },
  { id: 'python', label: 'Python' },
  { id: 'ruby', label: 'Ruby' },
  { id: 'java', label: 'Java' },
  { id: 'cpp', label: 'C++' },
  { id: 'go', label: 'Go' },
  { id: 'php', label: 'PHP' },
  { id: 'html', label: 'HTML' },
  { id: 'json', label: 'JSON' },
]

const SANDBOX = 'https://api.sandbox.openfx.com/v1'

export interface ApiSampleSet {
  title?: string
  samples: Record<ApiLanguage, string>
}

const samples: Record<string, ApiSampleSet> = {
  'oauth-token': {
    title: 'Obtain an access token',
    samples: {
      curl: `curl -X POST ${SANDBOX}/oauth/token \\
  -H "Content-Type: application/json" \\
  -d '{
    "grant_type": "client_credentials",
    "client_id": "ofx_live_xxxxxxxx",
    "client_secret": "ofx_secret_xxxxxxxx",
    "scope": "read write"
  }'`,
      javascript: `const response = await fetch('${SANDBOX}/oauth/token', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    grant_type: 'client_credentials',
    client_id: 'ofx_live_xxxxxxxx',
    client_secret: 'ofx_secret_xxxxxxxx',
    scope: 'read write',
  }),
});

const data = await response.json();
console.log(data.access_token);`,
      python: `import requests

response = requests.post(
    "${SANDBOX}/oauth/token",
    json={
        "grant_type": "client_credentials",
        "client_id": "ofx_live_xxxxxxxx",
        "client_secret": "ofx_secret_xxxxxxxx",
        "scope": "read write",
    },
)
response.raise_for_status()
print(response.json()["access_token"])`,
      ruby: `require "net/http"
require "json"

uri = URI("${SANDBOX}/oauth/token")
req = Net::HTTP::Post.new(uri)
req["Content-Type"] = "application/json"
req.body = {
  grant_type: "client_credentials",
  client_id: "ofx_live_xxxxxxxx",
  client_secret: "ofx_secret_xxxxxxxx",
  scope: "read write"
}.to_json

res = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true) { |http| http.request(req) }
puts JSON.parse(res.body)["access_token"]`,
      java: `HttpClient client = HttpClient.newHttpClient();
HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("${SANDBOX}/oauth/token"))
    .header("Content-Type", "application/json")
    .POST(HttpRequest.BodyPublishers.ofString("""
        {
          "grant_type": "client_credentials",
          "client_id": "ofx_live_xxxxxxxx",
          "client_secret": "ofx_secret_xxxxxxxx",
          "scope": "read write"
        }
        """))
    .build();

HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
System.out.println(response.body());`,
      cpp: `#include <curl/curl.h>
#include <iostream>
#include <string>

static size_t WriteCallback(void* contents, size_t size, size_t nmemb, std::string* out) {
  out->append((char*)contents, size * nmemb);
  return size * nmemb;
}

int main() {
  CURL* curl = curl_easy_init();
  std::string response;
  const char* json = R"({"grant_type":"client_credentials","client_id":"ofx_live_xxxxxxxx","client_secret":"ofx_secret_xxxxxxxx","scope":"read write"})";

  struct curl_slist* headers = nullptr;
  headers = curl_slist_append(headers, "Content-Type: application/json");

  curl_easy_setopt(curl, CURLOPT_URL, "${SANDBOX}/oauth/token");
  curl_easy_setopt(curl, CURLOPT_POSTFIELDS, json);
  curl_easy_setopt(curl, CURLOPT_HTTPHEADER, headers);
  curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, WriteCallback);
  curl_easy_setopt(curl, CURLOPT_WRITEDATA, &response);
  curl_easy_perform(curl);

  std::cout << response << std::endl;
  curl_slist_free_all(headers);
  curl_easy_cleanup(curl);
  return 0;
}`,
      go: `payload := strings.NewReader(\`{
  "grant_type": "client_credentials",
  "client_id": "ofx_live_xxxxxxxx",
  "client_secret": "ofx_secret_xxxxxxxx",
  "scope": "read write"
}\`)

req, _ := http.NewRequest("POST", "${SANDBOX}/oauth/token", payload)
req.Header.Set("Content-Type", "application/json")

resp, _ := http.DefaultClient.Do(req)
defer resp.Body.Close()
body, _ := io.ReadAll(resp.Body)
fmt.Println(string(body))`,
      php: `$ch = curl_init("${SANDBOX}/oauth/token");
curl_setopt_array($ch, [
  CURLOPT_POST => true,
  CURLOPT_HTTPHEADER => ["Content-Type: application/json"],
  CURLOPT_POSTFIELDS => json_encode([
    "grant_type" => "client_credentials",
    "client_id" => "ofx_live_xxxxxxxx",
    "client_secret" => "ofx_secret_xxxxxxxx",
    "scope" => "read write",
  ]),
  CURLOPT_RETURNTRANSFER => true,
]);
$response = curl_exec($ch);
curl_close($ch);
echo $response;`,
      html: `<!DOCTYPE html>
<html>
  <body>
    <script>
      fetch("${SANDBOX}/oauth/token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          grant_type: "client_credentials",
          client_id: "ofx_live_xxxxxxxx",
          client_secret: "ofx_secret_xxxxxxxx",
          scope: "read write",
        }),
      })
        .then((r) => r.json())
        .then(console.log);
    </script>
  </body>
</html>`,
      json: `{
  "grant_type": "client_credentials",
  "client_id": "ofx_live_xxxxxxxx",
  "client_secret": "ofx_secret_xxxxxxxx",
  "scope": "read write"
}`,
    },
  },
  'list-balances': {
    title: 'List balances',
    samples: {
      curl: `curl "${SANDBOX}/balances" \\
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"`,
      javascript: `const response = await fetch('${SANDBOX}/balances', {
  headers: { Authorization: 'Bearer YOUR_ACCESS_TOKEN' },
});
const { data } = await response.json();
console.log(data);`,
      python: `import requests

headers = {"Authorization": "Bearer YOUR_ACCESS_TOKEN"}
response = requests.get("${SANDBOX}/balances", headers=headers)
response.raise_for_status()
print(response.json())`,
      ruby: `uri = URI("${SANDBOX}/balances")
req = Net::HTTP::Get.new(uri)
req["Authorization"] = "Bearer YOUR_ACCESS_TOKEN"

res = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true) { |http| http.request(req) }
puts res.body`,
      java: `HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("${SANDBOX}/balances"))
    .header("Authorization", "Bearer YOUR_ACCESS_TOKEN")
    .GET()
    .build();

HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());`,
      cpp: `#include <curl/curl.h>

int main() {
  CURL* curl = curl_easy_init();
  struct curl_slist* headers = nullptr;
  headers = curl_slist_append(headers, "Authorization: Bearer YOUR_ACCESS_TOKEN");
  curl_easy_setopt(curl, CURLOPT_URL, "${SANDBOX}/balances");
  curl_easy_setopt(curl, CURLOPT_HTTPHEADER, headers);
  curl_easy_perform(curl);
  curl_slist_free_all(headers);
  curl_easy_cleanup(curl);
  return 0;
}`,
      go: `req, _ := http.NewRequest("GET", "${SANDBOX}/balances", nil)
req.Header.Set("Authorization", "Bearer YOUR_ACCESS_TOKEN")
resp, _ := http.DefaultClient.Do(req)`,
      php: `$ch = curl_init("${SANDBOX}/balances");
curl_setopt($ch, CURLOPT_HTTPHEADER, ["Authorization: Bearer YOUR_ACCESS_TOKEN"]);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
echo curl_exec($ch);`,
      html: `<script>
  fetch("${SANDBOX}/balances", {
    headers: { Authorization: "Bearer YOUR_ACCESS_TOKEN" },
  })
    .then((r) => r.json())
    .then(console.log);
</script>`,
      json: `{
  "data": [
    { "currency": "USD", "available": 5450822.00, "pending": 125000.00 },
    { "currency": "EUR", "available": 545650.00, "pending": 0 }
  ]
}`,
    },
  },
  'create-quote': {
    title: 'Create a quote',
    samples: {
      curl: `curl -X POST ${SANDBOX}/quotes \\
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "buy": "AED",
    "sell": "MXN",
    "referencedUnit": "MXN",
    "referenceAmount": 500000
  }'`,
      javascript: `const response = await fetch('${SANDBOX}/quotes', {
  method: 'POST',
  headers: {
    Authorization: 'Bearer YOUR_ACCESS_TOKEN',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    buy: 'AED',
    sell: 'MXN',
    referencedUnit: 'MXN',
    referenceAmount: 500000,
  }),
});`,
      python: `requests.post(
    "${SANDBOX}/quotes",
    headers={"Authorization": "Bearer YOUR_ACCESS_TOKEN"},
    json={
        "buy": "AED",
        "sell": "MXN",
        "referencedUnit": "MXN",
        "referenceAmount": 500000,
    },
)`,
      ruby: `req = Net::HTTP::Post.new(URI("${SANDBOX}/quotes"))
req["Authorization"] = "Bearer YOUR_ACCESS_TOKEN"
req["Content-Type"] = "application/json"
req.body = { buy: "AED", sell: "MXN", referencedUnit: "MXN", referenceAmount: 500000 }.to_json`,
      java: `HttpRequest.newBuilder()
    .uri(URI.create("${SANDBOX}/quotes"))
    .header("Authorization", "Bearer YOUR_ACCESS_TOKEN")
    .header("Content-Type", "application/json")
    .POST(HttpRequest.BodyPublishers.ofString(quoteJson))
    .build();`,
      cpp: `// POST ${SANDBOX}/quotes with JSON body`,
      go: `http.NewRequest("POST", "${SANDBOX}/quotes", bytes.NewBuffer(jsonBody))`,
      php: `curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode([...]));`,
      html: `<script>
  fetch("${SANDBOX}/quotes", {
    method: "POST",
    headers: {
      Authorization: "Bearer YOUR_ACCESS_TOKEN",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ buy: "AED", sell: "MXN", referencedUnit: "MXN", referenceAmount: 500000 }),
  });
</script>`,
      json: `{
  "buy": "AED",
  "sell": "MXN",
  "referencedUnit": "MXN",
  "referenceAmount": 500000
}`,
    },
  },
  'create-trade': {
    title: 'Execute a trade',
    samples: {
      curl: `curl -X POST ${SANDBOX}/trades \\
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \\
  -H "Content-Type: application/json" \\
  -H "Idempotency-Key: unique-key-12345" \\
  -d '{"quote_id": "qt_9a8b7c6d"}'`,
      javascript: `await fetch('${SANDBOX}/trades', {
  method: 'POST',
  headers: {
    Authorization: 'Bearer YOUR_ACCESS_TOKEN',
    'Content-Type': 'application/json',
    'Idempotency-Key': 'unique-key-12345',
  },
  body: JSON.stringify({ quote_id: 'qt_9a8b7c6d' }),
});`,
      python: `requests.post("${SANDBOX}/trades", headers={
    "Authorization": "Bearer YOUR_ACCESS_TOKEN",
    "Idempotency-Key": "unique-key-12345",
}, json={"quote_id": "qt_9a8b7c6d"})`,
      ruby: `Net::HTTP.post(uri, trade_body, headers)`,
      java: `// POST ${SANDBOX}/trades`,
      cpp: `// POST ${SANDBOX}/trades`,
      go: `http.Post("${SANDBOX}/trades", "application/json", body)`,
      php: `curl POST ${SANDBOX}/trades`,
      html: `<script>fetch("${SANDBOX}/trades", { method: "POST", ... })</script>`,
      json: `{
  "quote_id": "qt_9a8b7c6d"
}`,
    },
  },
  'create-withdrawal': {
    title: 'Create a withdrawal',
    samples: {
      curl: `curl -X POST ${SANDBOX}/withdrawals \\
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \\
  -H "Content-Type: application/json" \\
  -H "Idempotency-Key: unique-key-67890" \\
  -d '{"currency": "GBP", "amount": 675900.00, "destination_id": "dest_abc123"}'`,
      javascript: `await fetch('${SANDBOX}/withdrawals', {
  method: 'POST',
  headers: {
    Authorization: 'Bearer YOUR_ACCESS_TOKEN',
    'Content-Type': 'application/json',
    'Idempotency-Key': 'unique-key-67890',
  },
  body: JSON.stringify({
    currency: 'GBP',
    amount: 675900.00,
    destination_id: 'dest_abc123',
  }),
});`,
      python: `requests.post("${SANDBOX}/withdrawals", headers=headers, json={
    "currency": "GBP", "amount": 675900.00, "destination_id": "dest_abc123"
})`,
      ruby: `Net::HTTP.post(uri, withdrawal_body, headers)`,
      java: `// POST ${SANDBOX}/withdrawals`,
      cpp: `// POST ${SANDBOX}/withdrawals`,
      go: `http.Post("${SANDBOX}/withdrawals", "application/json", body)`,
      php: `curl POST ${SANDBOX}/withdrawals`,
      html: `<script>fetch("${SANDBOX}/withdrawals", { method: "POST", ... })</script>`,
      json: `{
  "currency": "GBP",
  "amount": 675900.00,
  "destination_id": "dest_abc123"
}`,
    },
  },
}

export function getApiSample(id: string): ApiSampleSet | null {
  return samples[id] ?? null
}

export const API_BASES = {
  sandbox: SANDBOX,
  production: 'https://api.openfx.com/v1',
}

export function mockApiResponse(
  method: string,
  path: string,
  body?: string,
): { status: number; body: unknown; note?: string } {
  const p = path.replace(/^\/v1/, '').split('?')[0]

  if (p === '/oauth/token' && method === 'POST') {
    return {
      status: 200,
      body: {
        access_token: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.demo',
        token_type: 'Bearer',
        expires_in: 3600,
        scope: 'read write',
      },
    }
  }

  if (p === '/balances' && method === 'GET') {
    return {
      status: 200,
      body: {
        data: [
          { currency: 'USD', available: 5450822.0, pending: 125000.0 },
          { currency: 'EUR', available: 545650.0, pending: 0 },
        ],
      },
    }
  }

  if (p === '/quotes' && method === 'POST') {
    return {
      status: 201,
      body: {
        id: 'qt_9a8b7c6d',
        buy: 'AED',
        sell: 'MXN',
        rate: 0.19843472,
        buy_amount: 99217.36,
        sell_amount: 500000.0,
        expires_at: new Date(Date.now() + 300000).toISOString(),
        status: 'open',
      },
    }
  }

  if (p === '/trades' && method === 'POST') {
    return {
      status: 201,
      body: {
        id: 'trd_1a2b3c4d',
        quote_id: 'qt_9a8b7c6d',
        buy: 'AED',
        sell: 'MXN',
        buy_amount: 99217.36,
        sell_amount: 500000.0,
        status: 'executed',
        executed_at: new Date().toISOString(),
      },
    }
  }

  if (p === '/withdrawals' && method === 'POST') {
    return {
      status: 201,
      body: {
        id: 'wd_5e6f7a8b',
        currency: 'GBP',
        amount: 675900.0,
        status: 'processing',
        destination_id: 'dest_abc123',
        created_at: new Date().toISOString(),
      },
    }
  }

  if (p.startsWith('/trades') && method === 'GET') {
    return {
      status: 200,
      body: {
        data: [{ id: 'trd_1a2b3c4d', status: 'settled', buy: 'AED', sell: 'MXN' }],
      },
    }
  }

  return {
    status: 404,
    body: {
      error: {
        code: 'not_found',
        message: `No mock for ${method} ${p}. Try GET /balances or POST /oauth/token.`,
      },
    },
  }
}
