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

const SANDBOX = 'https://api.sandbox.syntheticfi.com/v1'

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
    "client_id": "sf_live_xxxxxxxx",
    "client_secret": "sf_secret_xxxxxxxx",
    "scope": "read write"
  }'`,
      javascript: `const response = await fetch('${SANDBOX}/oauth/token', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    grant_type: 'client_credentials',
    client_id: 'sf_live_xxxxxxxx',
    client_secret: 'sf_secret_xxxxxxxx',
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
        "client_id": "sf_live_xxxxxxxx",
        "client_secret": "sf_secret_xxxxxxxx",
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
  client_id: "sf_live_xxxxxxxx",
  client_secret: "sf_secret_xxxxxxxx",
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
          "client_id": "sf_live_xxxxxxxx",
          "client_secret": "sf_secret_xxxxxxxx",
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
  const char* json = R"({"grant_type":"client_credentials","client_id":"sf_live_xxxxxxxx","client_secret":"sf_secret_xxxxxxxx","scope":"read write"})";

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
  "client_id": "sf_live_xxxxxxxx",
  "client_secret": "sf_secret_xxxxxxxx",
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
    "client_id" => "sf_live_xxxxxxxx",
    "client_secret" => "sf_secret_xxxxxxxx",
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
          client_id: "sf_live_xxxxxxxx",
          client_secret: "sf_secret_xxxxxxxx",
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
  "client_id": "sf_live_xxxxxxxx",
  "client_secret": "sf_secret_xxxxxxxx",
  "scope": "read write"
}`,
    },
  },
  'list-clients': {
    title: 'List clients',
    samples: {
      curl: `curl "${SANDBOX}/clients?limit=20" \\
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"`,
      javascript: `const response = await fetch('${SANDBOX}/clients?limit=20', {
  headers: { Authorization: 'Bearer YOUR_ACCESS_TOKEN' },
});
const { data } = await response.json();
console.log(data);`,
      python: `import requests

headers = {"Authorization": "Bearer YOUR_ACCESS_TOKEN"}
response = requests.get("${SANDBOX}/clients", params={"limit": 20}, headers=headers)
response.raise_for_status()
print(response.json())`,
      ruby: `uri = URI("${SANDBOX}/clients?limit=20")
req = Net::HTTP::Get.new(uri)
req["Authorization"] = "Bearer YOUR_ACCESS_TOKEN"

res = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true) { |http| http.request(req) }
puts res.body`,
      java: `HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("${SANDBOX}/clients?limit=20"))
    .header("Authorization", "Bearer YOUR_ACCESS_TOKEN")
    .GET()
    .build();

HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());`,
      cpp: `#include <curl/curl.h>
#include <iostream>
#include <string>

int main() {
  CURL* curl = curl_easy_init();
  struct curl_slist* headers = nullptr;
  headers = curl_slist_append(headers, "Authorization: Bearer YOUR_ACCESS_TOKEN");

  curl_easy_setopt(curl, CURLOPT_URL, "${SANDBOX}/clients?limit=20");
  curl_easy_setopt(curl, CURLOPT_HTTPHEADER, headers);

  CURLcode res = curl_easy_perform(curl);
  curl_slist_free_all(headers);
  curl_easy_cleanup(curl);
  return res == CURLE_OK ? 0 : 1;
}`,
      go: `req, _ := http.NewRequest("GET", "${SANDBOX}/clients?limit=20", nil)
req.Header.Set("Authorization", "Bearer YOUR_ACCESS_TOKEN")
resp, _ := http.DefaultClient.Do(req)`,
      php: `$ch = curl_init("${SANDBOX}/clients?limit=20");
curl_setopt($ch, CURLOPT_HTTPHEADER, ["Authorization: Bearer YOUR_ACCESS_TOKEN"]);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
echo curl_exec($ch);`,
      html: `<script>
  fetch("${SANDBOX}/clients?limit=20", {
    headers: { Authorization: "Bearer YOUR_ACCESS_TOKEN" },
  })
    .then((r) => r.json())
    .then(console.log);
</script>`,
      json: `{
  "data": [
    {
      "id": "cli_8f3a2b1c",
      "email": "client@example.com",
      "first_name": "Jane",
      "last_name": "Investor",
      "status": "active"
    }
  ],
  "has_more": false,
  "next_cursor": null
}`,
    },
  },
  'create-client': {
    title: 'Create a client',
    samples: {
      curl: `curl -X POST ${SANDBOX}/clients \\
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "email": "client@example.com",
    "first_name": "Jane",
    "last_name": "Investor",
    "advisor_id": "adv_123"
  }'`,
      javascript: `const response = await fetch('${SANDBOX}/clients', {
  method: 'POST',
  headers: {
    Authorization: 'Bearer YOUR_ACCESS_TOKEN',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: 'client@example.com',
    first_name: 'Jane',
    last_name: 'Investor',
    advisor_id: 'adv_123',
  }),
});`,
      python: `requests.post(
    "${SANDBOX}/clients",
    headers={"Authorization": "Bearer YOUR_ACCESS_TOKEN"},
    json={
        "email": "client@example.com",
        "first_name": "Jane",
        "last_name": "Investor",
        "advisor_id": "adv_123",
    },
)`,
      ruby: `req = Net::HTTP::Post.new(URI("${SANDBOX}/clients"))
req["Authorization"] = "Bearer YOUR_ACCESS_TOKEN"
req["Content-Type"] = "application/json"
req.body = { email: "client@example.com", first_name: "Jane", last_name: "Investor" }.to_json`,
      java: `HttpRequest.newBuilder()
    .uri(URI.create("${SANDBOX}/clients"))
    .header("Authorization", "Bearer YOUR_ACCESS_TOKEN")
    .header("Content-Type", "application/json")
    .POST(HttpRequest.BodyPublishers.ofString(clientJson))
    .build();`,
      cpp: `// POST ${SANDBOX}/clients with JSON body`,
      go: `http.NewRequest("POST", "${SANDBOX}/clients", bytes.NewBuffer(jsonBody))`,
      php: `curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode([...]));`,
      html: `<script>
  fetch("${SANDBOX}/clients", {
    method: "POST",
    headers: {
      Authorization: "Bearer YOUR_ACCESS_TOKEN",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: "client@example.com" }),
  });
</script>`,
      json: `{
  "email": "client@example.com",
  "first_name": "Jane",
  "last_name": "Investor",
  "advisor_id": "adv_123"
}`,
    },
  },
  'check-eligibility': {
    title: 'Check eligibility',
    samples: {
      curl: `curl -X POST ${SANDBOX}/eligibility/check \\
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{"account_id": "acc_4d5e6f7a", "requested_amount": 500000}'`,
      javascript: `await fetch('${SANDBOX}/eligibility/check', {
  method: 'POST',
  headers: {
    Authorization: 'Bearer YOUR_ACCESS_TOKEN',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ account_id: 'acc_4d5e6f7a', requested_amount: 500000 }),
});`,
      python: `requests.post("${SANDBOX}/eligibility/check", headers=headers, json={
    "account_id": "acc_4d5e6f7a", "requested_amount": 500000
})`,
      ruby: `Net::HTTP.post(uri, eligibility_body, headers)`,
      java: `// POST ${SANDBOX}/eligibility/check`,
      cpp: `// POST ${SANDBOX}/eligibility/check`,
      go: `http.Post("${SANDBOX}/eligibility/check", "application/json", body)`,
      php: `curl POST ${SANDBOX}/eligibility/check`,
      html: `<script>fetch("${SANDBOX}/eligibility/check", { method: "POST", ... })</script>`,
      json: `{
  "account_id": "acc_4d5e6f7a",
  "requested_amount": 500000
}`,
    },
  },
}

export function getApiSample(id: string): ApiSampleSet | null {
  return samples[id] ?? null
}

export const API_BASES = {
  sandbox: SANDBOX,
  production: 'https://api.syntheticfi.com/v1',
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

  if (p === '/clients' && method === 'GET') {
    return {
      status: 200,
      body: {
        data: [
          {
            id: 'cli_8f3a2b1c',
            email: 'client@example.com',
            first_name: 'Jane',
            last_name: 'Investor',
            status: 'active',
          },
        ],
        has_more: false,
        next_cursor: null,
      },
    }
  }

  if (p === '/clients' && method === 'POST') {
    return {
      status: 201,
      body: {
        id: 'cli_new_demo',
        email: 'client@example.com',
        status: 'active',
        created_at: new Date().toISOString(),
      },
    }
  }

  if (p === '/eligibility/check' && method === 'POST') {
    return {
      status: 200,
      body: {
        eligible: true,
        max_amount: 735000,
        advance_rate: 0.65,
        portfolio_value: 2450000,
      },
    }
  }

  if (p.startsWith('/financings') && method === 'GET') {
    return {
      status: 200,
      body: {
        data: [{ id: 'fin_1a2b3c4d', status: 'active', margin_status: 'healthy' }],
      },
    }
  }

  return {
    status: 404,
    body: {
      error: {
        code: 'not_found',
        message: `No mock for ${method} ${p}. Try GET /clients or POST /oauth/token.`,
      },
    },
  }
}
