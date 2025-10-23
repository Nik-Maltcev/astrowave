### Few-shot Learning Example (First Request)

Source: https://api-docs.deepseek.com/guides/kv_cache

Demonstrates a few-shot learning scenario by providing a system message and a series of user-assistant question-answer pairs to guide the model's responses. This setup primes the model for specific output formats and knowledge.

```Python
messages: [
    {"role": "system", "content": "You are a history expert. The user will provide a series of questions, and your answers should be concise and start with `Answer:`"},
    {"role": "user", "content": "In what year did Qin Shi Huang unify the six states?"},
    {"role": "assistant", "content": "Answer: 221 BC"},
    {"role": "user", "content": "Who was the founder of the Han Dynasty?"},
    {"role": "assistant", "content": "Answer: Liu Bang"},
    {"role": "user", "content": "Who was the last emperor of the Tang Dynasty?"},
    {"role": "assistant", "content": "Answer: Li Zhu"},
    {"role": "user", "content": "Who was the founding emperor of the Ming Dynasty?"},
    {"role": "assistant", "content": "Answer: Zhu Yuanzhang"},
    {"role": "user", "content": "Who was the founding emperor of the Qing Dynasty?"}
]
```

--------------------------------

### Call Chat API with Python (OpenAI SDK)

Source: https://api-docs.deepseek.com/zh-cn

Example of calling the DeepSeek chat completions API using the Python OpenAI SDK. Requires installation of the 'openai' package. Demonstrates setting the base_url and api_key.

```python
# Please install OpenAI SDK first: `pip3 install openai`

from openai import OpenAI

client = OpenAI(api_key="<DeepSeek API Key>", base_url="https://api.deepseek.com")

response = client.chat.completions.create(
    model="deepseek-chat",
    messages=[
{"role":"system","content":"You are a helpful assistant"},
{"role":"user","content":"Hello"},
],
    stream=False
)

print(response.choices[0].message.content)
```

--------------------------------

### Call Chat API with Node.js (OpenAI SDK)

Source: https://api-docs.deepseek.com/zh-cn

Example of calling the DeepSeek chat completions API using the Node.js OpenAI SDK. Requires installation of the 'openai' package. Demonstrates setting the baseURL and apiKey.

```javascript
// Please install OpenAI SDK first: `npm install openai`

import OpenAI from "openai";

const openai = new OpenAI({
baseURL:'https://api.deepseek.com',
apiKey:'<DeepSeek API Key>'
});

async function main(){
const completion = await openai.chat.completions.create({
messages:[{role:"system",content:"You are a helpful assistant."}],
model:"deepseek-chat",
});

console.log(completion.choices[0].message.content);
}

main();
```

--------------------------------

### DeepSeek Reasoner API - Streaming Example

Source: https://api-docs.deepseek.com/zh-cn/guides/reasoning_model

Example of making a streaming API call to the deepseek-reasoner model. It demonstrates how to accumulate the reasoning_content and content from streamed chunks and how to prepare messages for the next turn.

```python
from openai import OpenAI
client = OpenAI(api_key="<DeepSeek API Key>", base_url="https://api.deepseek.com")

# Round 1
messages = [{"role":"user","content":"9.11 and 9.8, which is greater?"}]
response = client.chat.completions.create(
    model="deepseek-reasoner",
    messages=messages,
    stream=True
)

reasoning_content ="
content ="

for chunk in response:
    if chunk.choices[0].delta.reasoning_content:
        reasoning_content += chunk.choices[0].delta.reasoning_content
    else:
        content += chunk.choices[0].delta.content

# Round 2
messages.append({"role":"assistant","content": content})
messages.append({'role':'user','content':"How many Rs are there in the word 'strawberry'?"})
response = client.chat.completions.create(
    model="deepseek-reasoner",
    messages=messages,
    stream=True
)
# ...
```

--------------------------------

### Install OpenAI SDK

Source: https://api-docs.deepseek.com/guides/reasoning_model

Upgrade the OpenAI SDK to the latest version to support new parameters for the DeepSeek API.

```bash
pip3 install -U openai
```

--------------------------------

### DeepSeek API Chat Prefix Completion Example

Source: https://api-docs.deepseek.com/zh-cn/guides/chat_prefix_completion

Demonstrates how to use the DeepSeek API for chat prefix completion in Python. This feature allows the model to complete messages starting with an assistant's prefix. The example shows setting the assistant's message with a Python code block prefix and using stop sequences to control the output.

```Python
from openai import OpenAI

client = OpenAI(
    api_key="<your api key>",
    base_url="https://api.deepseek.com/beta",
)

messages =[
{"role":"user","content":"Please write quick sort code"},
{"role":"assistant","content":"```python\n","prefix":True}
]
response = client.chat.completions.create(
    model="deepseek-chat",
    messages=messages,
    stop=["```"],
)
print(response.choices[0].message.content)

```

--------------------------------

### Install OpenAI SDK

Source: https://api-docs.deepseek.com/zh-cn/guides/reasoning_model

Update the OpenAI SDK to the latest version to support new parameters required for the deepseek-reasoner model.

```bash
pip3 install -U openai
```

--------------------------------

### DeepSeek Chat API Call (Node.js)

Source: https://api-docs.deepseek.com/index

Provides an example of calling the DeepSeek chat API using the OpenAI Node.js SDK. It involves installing the 'openai' package and initializing the OpenAI client with the API key and base URL.

```javascript
// Please install OpenAI SDK first: `npm install openai`  
  
import OpenAI from"openai";  
  
const openai =new OpenAI({  
baseURL:'https://api.deepseek.com',  
apiKey:'<DeepSeek API Key>'  
});  
  
async function main(){  
const completion =await openai.chat.completions.create({  
messages:[{role:"system",content:"You are a helpful assistant."}],  
model:"deepseek-chat",  
});  
  
console.log(completion.choices[0].message.content);  
}  
  
main();
```

--------------------------------

### Install Anthropic SDK

Source: https://api-docs.deepseek.com/guides/anthropic_api

Installs the official Anthropic SDK for Python using pip, enabling programmatic interaction with the Anthropic API, which can be configured to use DeepSeek models.

```bash
pip install anthropic
```

--------------------------------

### Install Claude Code

Source: https://api-docs.deepseek.com/guides/anthropic_api

Installs the Claude Code package globally using npm. This is the first step to using DeepSeek within the Claude Code environment.

```bash
npm install -g @anthropic-ai/claude-code
```

--------------------------------

### DeepSeek API LangChain Integration

Source: https://api-docs.deepseek.com/faq

Demonstrates how to integrate the DeepSeek API with the LangChain framework. This example requires replacing a placeholder API key with your actual DeepSeek API key.

```Python
from langchain_community.llms.deepseek import DeepSeek

# Replace 'YOUR_API_KEY' with your actual DeepSeek API key
llm = DeepSeek(deepseek_api_key='YOUR_API_KEY')

# Example usage:
response = llm.invoke("Hello, DeepSeek!")
print(response)
```

--------------------------------

### DeepSeek Chat Completion Example Response

Source: https://api-docs.deepseek.com/api/create-chat-completion

An example of a complete chat completion response object from the DeepSeek API, illustrating the structure and typical values.

```APIDOC
{
  "id": "930c60df-bf64-41c9-a88e-3ec75f81e00e",
  "choices": [
    {
      "finish_reason": "stop",
      "index": 0,
      "message": {
        "content": "Hello! How can I help you today?",
        "role": "assistant"
      }
    }
  ],
  "created": 1705651092,
  "model": "deepseek-chat",
  "object": "chat.completion",
  "usage": {
    "completion_tokens": 10,
    "prompt_tokens": 16,
    "total_tokens": 26
  }
}
```

--------------------------------

### Call DeepSeek Models via Anthropic API (Python SDK)

Source: https://api-docs.deepseek.com/zh-cn/guides/anthropic_api

Guide to calling DeepSeek models using the Anthropic Python SDK. This includes installing the SDK, setting environment variables for the API key and base URL, and making a sample API call to the 'deepseek-chat' model.

```bash
pip install anthropic
```

```bash
export ANTHROPIC_BASE_URL=https://api.deepseek.com/anthropic
export ANTHROPIC_API_KEY=${YOUR_API_KEY}
```

```python
import anthropic

client = anthropic.Anthropic()

message = client.messages.create(
    model="deepseek-chat",
    max_tokens=1000,
    system="You are a helpful assistant.",
    messages=[
        {
            "role": "user",
            "content": [
                {
                    "type": "text",
                    "text": "Hi, how are you?"
                }
            ]
        }
    ]
)
print(message.content)
```

--------------------------------

### Example Chat Completion Response

Source: https://api-docs.deepseek.com/zh-cn/api/create-chat-completion

A concrete example of a chat completion response, showing typical values for fields like message content, model name, and usage tokens.

```JSON
{
  "id": "930c60df-bf64-41c9-a88e-3ec75f81e00e",
  "choices": [
    {
      "finish_reason": "stop",
      "index": 0,
      "message": {
        "content": "Hello! How can I help you today?",
        "role": "assistant"
      }
    }
  ],
  "created": 1705651092,
  "model": "deepseek-chat",
  "object": "chat.completion",
  "usage": {
    "completion_tokens": 10,
    "prompt_tokens": 16,
    "total_tokens": 26
  }
}
```

--------------------------------

### FIM Completion API Usage Example

Source: https://api-docs.deepseek.com/news/news0725

Example demonstrating how to use the DeepSeek API for FIM (Fill-In-the-Middle) Completion. This involves setting the beta base URL and providing prefix and suffix content for the model to complete.

```Python
import os

from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("DEEPSEEK_API_KEY"),
    base_url="https://api.deepseek.com/beta",
)

response = client.completions.create(
    model="deepseek-coder-33b-instruct",
    messages=[
        {
            "role": "system",
            "content": "You are a helpful assistant that completes code.",
        },
        {
            "role": "user",
            "content": "def fibonacci(n):\n    """The Fibonacci sequence is a sequence where the next term is the sum of the previous two terms, usually starting with 0 and 1. The sequence goes: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, ..."""\n    """Return the nth Fibonacci number.
    """
    """# TODO: Implement the Fibonacci sequence logic here
    """
    """
    if n <= 0:
        return 0
    elif n == 1:
        return 1
    else:
        return fibonacci(n - 1) + fibonacci(n - 2)

print(fibonacci(10))",
            "suffix": "\n",
            "prefix": "def fibonacci(n):\n    """The Fibonacci sequence is a sequence where the next term is the sum of the previous two terms, usually starting with 0 and 1. The sequence goes: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, ..."""\n    """Return the nth Fibonacci number.
    """
    """# TODO: Implement the Fibonacci sequence logic here
    """
    """
"

print(fibonacci(10))"
        }
    ],
    temperature=0.1,
    stop=["</fim_middle>"],
    fim_middle="<fim_middle>",
    fim_suffix="<fim_suffix>",
    fim_prefix="<fim_prefix>"
)

print(response.choices[0].message.content)
```

--------------------------------

### List DeepSeek Models using Python

Source: https://api-docs.deepseek.com/api/list-models

Example using Python's requests library to get the list of DeepSeek models. Ensure you replace '<TOKEN>' with your actual API key.

```python
import requests

url = "https://api.deepseek.com/models"
headers = {
    "Authorization": "Bearer <TOKEN>",
    "Accept": "application/json"
}

response = requests.get(url, headers=headers)

if response.status_code == 200:
    print(response.json())
else:
    print(f"Error: {response.status_code}")
    print(response.text)
```

--------------------------------

### List DeepSeek Models using Go

Source: https://api-docs.deepseek.com/api/list-models

Example using Go's net/http package to retrieve the list of DeepSeek models. Remember to insert your API token.

```go
package main

import (
	"fmt"
	"io/ioutil"
	"net/http"
	"strings"
)

func main() {
	url := "https://api.deepseek.com/models"

	client := &http.Client{}

	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		fmt.Println("Error creating request:", err)
		return
	}

	req.Header.Add("Authorization", "Bearer <TOKEN>")
	req.Header.Add("Accept", "application/json")

	resp, err := client.Do(req)
	if err != nil {
		fmt.Println("Error sending request:", err)
		return
	}

	defer resp.Body.Close()

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		fmt.Println("Error reading response body:", err)
		return
	}

	fmt.Println(string(body))
}
```

--------------------------------

### Chat Completion Response Example

Source: https://api-docs.deepseek.com/zh-cn/api/create-chat-completion

An example of a standard chat completion response from the Deepseek API, illustrating the expected JSON structure and data types.

```JSON
{
  "id": "string",
  "choices": [
    {
      "finish_reason": "stop",
      "index": 0,
      "message": {
        "content": "string",
        "reasoning_content": "string",
        "tool_calls": [
          {
            "id": "string",
            "type": "function",
            "function": {
              "name": "string",
              "arguments": "string"
            }
          }
        ],
        "role": "assistant"
      },
      "logprobs": {
        "content": [
          {
            "token": "string",
            "logprob": 0,
            "bytes": [
              0
            ],
            "top_logprobs": [
              {
                "token": "string",
                "logprob": 0,
                "bytes": [
                  0
                ]
              }
            ]
          }
        ]
      }
    }
  ],
  "created": 0,
  "model": "string",
  "system_fingerprint": "string",
  "object": "chat.completion",
  "usage": {
    "completion_tokens": 0,
    "prompt_tokens": 0,
    "prompt_cache_hit_tokens": 0,
    "prompt_cache_miss_tokens": 0,
    "total_tokens": 0,
    "completion_tokens_details": {
      "reasoning_tokens": 0
    }
  }
}
```

--------------------------------

### Few-shot Learning Example (Second Request)

Source: https://api-docs.deepseek.com/guides/kv_cache

Illustrates a subsequent request in a few-shot learning sequence, reusing previous context to reduce cost via context caching. Only the final user query differs, showcasing the efficiency of caching previously provided examples.

```Python
messages: [
    {"role": "system", "content": "You are a history expert. The user will provide a series of questions, and your answers should be concise and start with `Answer:`"},
    {"role": "user", "content": "In what year did Qin Shi Huang unify the six states?"},
    {"role": "assistant", "content": "Answer: 221 BC"},
    {"role": "user", "content": "Who was the founder of the Han Dynasty?"},
    {"role": "assistant", "content": "Answer: Liu Bang"},
    {"role": "user", "content": "Who was the last emperor of the Tang Dynasty?"},
    {"role": "assistant", "content": "Answer: Li Zhu"},
    {"role": "user", "content": "Who was the founding emperor of the Ming Dynasty?"},
    {"role": "assistant", "content": "Answer: Zhu Yuanzhang"},
    {"role": "user", "content": "When did the Shang Dynasty fall?"}
]
```

--------------------------------

### Chat Prefix Completion Example

Source: https://api-docs.deepseek.com/guides/chat_prefix_completion

Demonstrates how to use the DeepSeek API for chat prefix completion in Python. It shows setting the base URL, constructing messages with an assistant prefix, and handling the response.

```Python
from openai import OpenAI

client = OpenAI(
    api_key="<your api key>",
    base_url="https://api.deepseek.com/beta",
)

messages =[
{"role":"user","content":"Please write quick sort code"},
{"role":"assistant","content":"```python\n","prefix":True}
]
response = client.chat.completions.create(
    model="deepseek-chat",
    messages=messages,
    stop=["```"],
)
print(response.choices[0].message.content)
```

--------------------------------

### DeepSeek API JSON Output Example

Source: https://api-docs.deepseek.com/zh-cn/guides/json_mode

Demonstrates how to configure and use the DeepSeek API for JSON output. This involves setting the `response_format` parameter and providing a structured prompt with a JSON example. The code uses the OpenAI Python client library.

```Python
import json
from openai import OpenAI

client = OpenAI(
    api_key="<your api key>",
    base_url="https://api.deepseek.com",
)

system_prompt ="""
The user will provide some exam text. Please parse the "question" and "answer" and output them in JSON format.   

EXAMPLE INPUT:   
Which is the highest mountain in the world? Mount Everest.  

EXAMPLE JSON OUTPUT:  
{
    "question": "Which is the highest mountain in the world?",
    "answer": "Mount Everest"
}
"""

user_prompt ="Which is the longest river in the world? The Nile River."

messages =[
    {"role":"system", "content": system_prompt},
    {"role":"user", "content": user_prompt}
]

response = client.chat.completions.create(
    model="deepseek-chat",
    messages=messages,
    response_format={
        'type': 'json_object'
    }
)

print(json.loads(response.choices[0].message.content))
```

--------------------------------

### Python JSON Output Example

Source: https://api-docs.deepseek.com/guides/json_mode

Demonstrates how to configure and use the DeepSeek API for generating JSON output. It includes setting the response format, crafting prompts with JSON examples, and parsing the JSON response.

```Python
import json
from openai import OpenAI

client = OpenAI(
    api_key="<your api key>",
    base_url="https://api.deepseek.com",
)

system_prompt ="""
The user will provide some exam text. Please parse the "question" and "answer" and output them in JSON format.   

EXAMPLE INPUT:   
Which is the highest mountain in the world? Mount Everest.  

EXAMPLE JSON OUTPUT:  
{
    "question": "Which is the highest mountain in the world?",
    "answer": "Mount Everest"
}  
"""

user_prompt ="Which is the longest river in the world? The Nile River."

messages =["role":"system","content": system_prompt},
{"role":"user","content": user_prompt}]

response = client.chat.completions.create(
    model="deepseek-chat",
    messages=messages,
    response_format={
'type':'json_object'
}
)

print(json.loads(response.choices[0].message.content))
```

--------------------------------

### DeepSeek Chat Completion Chunk Example

Source: https://api-docs.deepseek.com/zh-cn/api/create-chat-completion

Example of a data chunk received during a streaming chat completion from the DeepSeek API. It shows the incremental content and metadata associated with each chunk.

```JSON
data: {"id": "1f633d8bfc032625086f14113c411638", "choices": [{"index": 0, "delta": {"content": "Hello", "role": "assistant"}, "finish_reason": null, "logprobs": null}], "created": 1718345013, "model": "deepseek-chat", "system_fingerprint": "fp_a49d71b8a1", "object": "chat.completion.chunk"}  

```

--------------------------------

### List DeepSeek Models using Ruby

Source: https://api-docs.deepseek.com/api/list-models

An example of how to fetch DeepSeek models using Ruby's Net::HTTP library. Ensure your API token is correctly substituted.

```ruby
require 'net/http'
require 'uri'

uri = URI.parse("https://api.deepseek.com/models")

request = Net::HTTP::Get.new(uri)
request["Authorization"] = "Bearer <TOKEN>"
request["Accept"] = "application/json"

response = Net::HTTP.start(uri.hostname, uri.port, :use_ssl => uri.scheme == "https") do |http|
  http.request(request)
end

puts response.body
```

--------------------------------

### Python Function Calling Example

Source: https://api-docs.deepseek.com/zh-cn/guides/function_calling

Demonstrates how to use Function Calling with the DeepSeek API in Python. It shows how to define tools, send messages, and handle tool calls to extend model capabilities. The example requires the 'openai' library and a DeepSeek API key.

```Python
from openai import OpenAI

defsend_messages(messages):
    response = client.chat.completions.create(
        model="deepseek-chat",
        messages=messages,
        tools=tools
)
    return response.choices[0].message

client = OpenAI(
    api_key="<your api key>",
    base_url="https://api.deepseek.com",
)

tools =[
{
"type":"function",
"function":{
"name":"get_weather",
"description":"Get weather of a location, the user should supply a location first.",
"parameters":{
"type":"object",
"properties":{
"location":{
"type":"string",
"description":"The city and state, e.g. San Francisco, CA",
}
},
"required":["location"]
},
}
},
]

messages =["role":"user","content":"How's the weather in Hangzhou?"]
message = send_messages(messages)
print(f"User>\t {messages[0]['content']}")

tool = message.tool_calls[0]
messages.append(message)

messages.append({"role":"tool","tool_call_id": tool.id,"content":"24℃"})
message = send_messages(messages)
print(f"Model>\t {message.content}")
```

--------------------------------

### DeepSeek-R1 Model Introduction

Source: https://api-docs.deepseek.com/updates

Announces the introduction of the DeepSeek-R1 model, which can be invoked using `model='deepseek-reasoner'`. Provides links to release details and guides for the reasoning model.

```APIDOC
Version: 2025-01-20
Model: DeepSeek-R1 (deepseek-reasoner)

Details: https://www.deepseek.com/blog/deepseek-r1-release
Guides: https://platform.deepseek.com/api-docs/api-guides/reasoning-model
```

--------------------------------

### Execute Claude Code

Source: https://api-docs.deepseek.com/guides/anthropic_api

Navigates to the project directory and executes the Claude Code command to start the integration process.

```bash
cd my-project
claude
```

--------------------------------

### FIM Completion using Python

Source: https://api-docs.deepseek.com/guides/fim_completion

Demonstrates how to perform FIM (Fill In the Middle) completion using the DeepSeek API with Python. This example shows how to set up the OpenAI client with the correct base URL for the beta feature and make a completion request with a prompt, suffix, and max tokens.

```Python
from openai import OpenAI

client = OpenAI(
    api_key="<your api key>",
    base_url="https://api.deepseek.com/beta",
)

response = client.completions.create(
    model="deepseek-chat",
    prompt="def fib(a):",
    suffix="    return fib(a-1) + fib(a-2)",
    max_tokens=128
)
print(response.choices[0].text)
```

--------------------------------

### DeepSeek API Disk Caching Usage

Source: https://api-docs.deepseek.com/zh-cn/news/news0802

Details on how DeepSeek API's disk caching service works automatically without code modifications. It explains that caching is based on identical prefixes from the start of the token sequence and provides examples for multi-turn conversations and data analysis scenarios. It also lists application types that benefit from this feature.

```APIDOC
DeepSeek API Disk Caching:

How to Use:
- The disk caching service is automatically enabled and requires no code changes or interface modifications.
- Caching is based on identical prefixes starting from the 0th token.
- Examples:
  1. Multi-turn conversations: Subsequent turns hit the cache of the previous turn's context.
  2. Data analysis: Subsequent requests with the same prefix hit the context cache.

Beneficial Applications:
- Chatbots with long preset prompts.
- Role-playing applications with long character settings and multi-turn dialogues.
- Data analysis applications querying fixed text collections.
- Code analysis and debugging tools for code repositories.
- Few-shot learning applications.

Further details can be found in the guide on using disk caching.
```

--------------------------------

### List DeepSeek Models using Java

Source: https://api-docs.deepseek.com/api/list-models

Java example using Apache HttpClient to list DeepSeek models. Replace '<TOKEN>' with your valid API key.

```java
import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class DeepSeekModels {

    public static void main(String[] args) {
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://api.deepseek.com/models"))
                .header("Authorization", "Bearer <TOKEN>") // Replace with your token
                .header("Accept", "application/json")
                .GET()
                .build();

        try {
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
            System.out.println(response.body());
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
        }
    }
}
```

--------------------------------

### List DeepSeek Models using PHP

Source: https://api-docs.deepseek.com/api/list-models

PHP example for fetching DeepSeek models using cURL. Ensure your API token is correctly set.

```php
<?php

$url = 'https://api.deepseek.com/models';
$token = '<TOKEN>'; // Replace with your actual token

$headers = [
    'Authorization: Bearer ' . $token,
    'Accept: application/json'
];

$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'GET');

$response = curl_exec($ch);

if (curl_errno($ch)) {
    echo 'Error:' . curl_error($ch);
} else {
    echo $response;
}

curl_close($ch);
?>
```

--------------------------------

### DeepSeek Chat API Call (Python)

Source: https://api-docs.deepseek.com/index

Shows how to use the OpenAI Python SDK to interact with the DeepSeek chat API. It requires installing the 'openai' package and configuring the client with the DeepSeek API key and base URL.

```python
# Please install OpenAI SDK first: `pip3 install openai`  
  
from openai import OpenAI  
  
client = OpenAI(api_key="<DeepSeek API Key>", base_url="https://api.deepseek.com")  
  
response = client.chat.completions.create(  
    model="deepseek-chat",  
    messages=[  
{"role":"system","content":"You are a helpful assistant"},
{"role":"user","content":"Hello"},
],  
    stream=False  
)
  
print(response.choices[0].message.content)
```

--------------------------------

### List DeepSeek Models using CURL

Source: https://api-docs.deepseek.com/api/list-models

Example using cURL to fetch the list of available DeepSeek models. Requires an API token for authentication.

```curl
curl -L -X GET 'https://api.deepseek.com/models' \
-H 'Accept: application/json' \
-H 'Authorization: Bearer <TOKEN>'
```

--------------------------------

### List DeepSeek Models using C#

Source: https://api-docs.deepseek.com/api/list-models

This C# example shows how to call the DeepSeek API to list models using HttpClient. Remember to replace '<TOKEN>' with your API key.

```csharp
using System;
using System.Net.Http;
using System.Threading.Tasks;

public class DeepSeekModels
{
    public static async Task GetModelsAsync()
    {
        using (var client = new HttpClient())
        {
            client.BaseAddress = new Uri("https://api.deepseek.com/");
            client.DefaultRequestHeaders.Add("Authorization", "Bearer <TOKEN>");
            client.DefaultRequestHeaders.Add("Accept", "application/json");

            HttpResponseMessage response = await client.GetAsync("models");

            if (response.IsSuccessStatusCode)
            {
                string responseBody = await response.Content.ReadAsStringAsync();
                Console.WriteLine(responseBody);
            }
            else
            {
                Console.WriteLine($"Error: {response.StatusCode}");
            }
        }
    }

    public static void Main(string[] args)
    {
        GetModelsAsync().Wait();
    }
}
```

--------------------------------

### DeepSeek Reasoner API - Non-Streaming Example

Source: https://api-docs.deepseek.com/zh-cn/guides/reasoning_model

Example of making a non-streaming API call to the deepseek-reasoner model. It shows how to retrieve both the reasoning_content and the final content from the response and how to structure messages for subsequent turns in a conversation.

```python
from openai import OpenAI
client = OpenAI(api_key="<DeepSeek API Key>", base_url="https://api.deepseek.com")

# Round 1
messages = [{"role":"user","content":"9.11 and 9.8, which is greater?"}]
response = client.chat.completions.create(
    model="deepseek-reasoner",
    messages=messages
)

reasoning_content = response.choices[0].message.reasoning_content
content = response.choices[0].message.content

# Round 2
messages.append({'role':'assistant','content': content})
messages.append({'role':'user','content':"How many Rs are there in the word 'strawberry'?"})
response = client.chat.completions.create(
    model="deepseek-reasoner",
    messages=messages
)
# ...
```

--------------------------------

### DeepSeek Function Calling Example (Python)

Source: https://api-docs.deepseek.com/guides/function_calling

Demonstrates how to use DeepSeek's Function Calling feature with Python to enable the model to call external tools. It includes setting up the OpenAI client, defining tools with function schemas, and managing the conversation flow for tool execution.

```Python
from openai import OpenAI

defsend_messages(messages):
    response = client.chat.completions.create(
        model="deepseek-chat",
        messages=messages,
        tools=tools
)
    return response.choices[0].message

client = OpenAI(
    api_key="<your api key>",
    base_url="https://api.deepseek.com",
)

tools =[
{
"type":"function",
"function":{
"name":"get_weather",
"description":"Get weather of a location, the user should supply a location first.",
"parameters":{
"type":"object",
"properties":{
"location":{
"type":"string",
"description":"The city and state, e.g. San Francisco, CA",
}
},
"required":["location"]
},
}
},
]

messages =[{'role':'user','content':'How\'s the weather in Hangzhou?'}]
message = send_messages(messages)
print(f"User>\t {messages[0]['content']}")

tool = message.tool_calls[0]
messages.append(message)

messages.append({'role':'tool','tool_call_id': tool.id,'content':'24℃'})
message = send_messages(messages)
print(f"Model>\t {message.content}")
```

--------------------------------

### Call Chat API with Curl

Source: https://api-docs.deepseek.com/zh-cn

Example of calling the DeepSeek chat completions API using curl. This demonstrates how to send a POST request with model, messages, and stream parameters.

```curl
curl https://api.deepseek.com/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <DeepSeek API Key>" \
  -d '{ \
        "model": "deepseek-chat", \
        "messages": [ \
          {"role": "system", "content": "You are a helpful assistant."}, \
          {"role": "user", "content": "Hello!"} \
        ], \
        "stream": false \
      }'
```

--------------------------------

### Integrate DeepSeek with Claude Code

Source: https://api-docs.deepseek.com/zh-cn/guides/anthropic_api

Instructions to integrate DeepSeek models with Claude Code. This involves installing the Claude Code package, configuring environment variables for the DeepSeek API endpoint and authentication, and running the 'claude' command within your project directory.

```bash
npm install -g @anthropic-ai/claude-code
```

```bash
export ANTHROPIC_BASE_URL=https://api.deepseek.com/anthropic
export ANTHROPIC_AUTH_TOKEN=${DEEPSEEK_API_KEY}
export ANTHROPIC_MODEL=deepseek-chat
export ANTHROPIC_SMALL_FAST_MODEL=deepseek-chat
```

```bash
cd my-project
claude
```

--------------------------------

### DeepSeek API Context Caching Example 1: Long Text Q&A

Source: https://api-docs.deepseek.com/guides/kv_cache

Demonstrates context caching for a long text Q&A scenario. The first request includes a system message and a user prompt. The second request shares the same system message and the initial part of the user prompt, resulting in a cache hit for the overlapping prefix.

```APIDOC
Example 1: Long Text Q&A

First Request:
```json
messages: [
    {"role": "system", "content": "You are an experienced financial report analyst..."},
    {"role": "user", "content": "<financial report content>\n\nPlease summarize the key information of this financial report."}
]
```

Second Request:
```json
messages: [
    {"role": "system", "content": "You are an experienced financial report analyst..."},
    {"role": "user", "content": "<financial report content>\n\nPlease analyze the profitability of this financial report."}
]
```

Explanation: Both requests share the same system message and the initial part of the user message ('<financial report content>'). This common prefix triggers a cache hit during the second request.
```

--------------------------------

### DeepSeek API Temperature Parameter Guide

Source: https://api-docs.deepseek.com/quick_start/parameter_settings

Explains the 'temperature' parameter in the DeepSeek API, its default value, and recommended settings for different use cases. The temperature parameter controls the randomness of the output.

```APIDOC
The Temperature Parameter

The default value of `temperature` is 1.0.

We recommend users to set the `temperature` according to their use case listed in below.

USE CASE | TEMPERATURE
---|---
Coding / Math | 0.0
Data Cleaning / Data Analysis | 1.0
General Conversation | 1.3
Translation | 1.3
Creative Writing / Poetry | 1.5
```

--------------------------------

### Array Type

Source: https://api-docs.deepseek.com/zh-cn/guides/function_calling

Describes the array type, noting that 'minItems' and 'maxItems' are not supported. The example demonstrates an array of strings for 'keywords', sorted by importance.

```JSON
{
    "type": "object",
    "properties": {
        "keywords": {
            "type": "array",
            "description": "Five keywords of the article, sorted by importance",
            "items": {
                "type": "string",
                "description": "A concise and accurate keyword or phrase."
            }
        }
    },
    "required": ["keywords"],
    "additionalProperties": false
}
```

--------------------------------

### DeepSeek API - System Prompt Adjustment

Source: https://api-docs.deepseek.com/zh-cn/news/news0905

Advises users to adjust the System Prompt when using DeepSeek-V2.5, especially if encountering performance issues. This highlights the importance of system prompts in guiding model behavior.

```APIDOC
API Usage: System Prompt
Recommendation:
  - For DeepSeek-V2.5, consider adjusting the System Prompt to optimize performance.
  - Especially recommended if experiencing degraded results compared to previous versions.
Purpose:
  - The System Prompt sets the context, instructions, and persona for the model's responses.
```

--------------------------------

### $ref and $def for Modularity and Recursion

Source: https://api-docs.deepseek.com/zh-cn/guides/function_calling

Demonstrates the use of '$def' to define reusable schema modules and '$ref' to reference them, enabling modularity and reducing repetition. It also shows how '$ref' can be used for recursive structures. The example defines an 'author' schema and references it within an 'authors' array.

```JSON
{
    "type": "object",
    "properties": {
        "report_date": {
            "type": "string",
            "description": "The date when the report was published"
        },
        "authors": {
            "type": "array",
            "description": "The authors of the report",
            "items": {
                "$ref": "#/$def/author"
            }
        }
    },
    "required": ["report_date", "authors"],
    "additionalProperties": false,
    "$def": {
        "authors": {
            "type": "object",
            "properties": {
                "name": {
                    "type": "string",
                    "description": "author's name"
                },
                "institution": {
                    "type": "string",
                    "description": "author's institution"
                },
                "email": {
                    "type": "string",
                    "format": "email",
                    "description": "author's email"
                }
            },
            "additionalProperties": false,
            "required": ["name", "institution", "email"]
        }
    }
}
```

--------------------------------

### Get User Balance API

Source: https://api-docs.deepseek.com/api/get-user-balance

Retrieves the current balance information for the user's API account. It returns whether the balance is sufficient for API calls and detailed balance information per currency.

```APIDOC
GET /user/balance

Description:
Get user current balance

Responses:
200 OK:
  Content:
    application/json:
      Schema:
        type: object
        properties:
          is_available: { type: boolean, description: Whether the user's balance is sufficient for API calls. }
          balance_infos: { type: array, description: Array of balance information per currency., items: { type: object, properties: { currency: { type: string, enum: [CNY, USD], description: The currency of the balance. }, total_balance: { type: string, description: The total available balance, including the granted balance and the topped-up balance. }, granted_balance: { type: string, description: The total not expired granted balance. }, topped_up_balance: { type: string, description: The total topped-up balance. } } } }

Example:
{
  "is_available": true,
  "balance_infos": [
    {
      "currency": "CNY",
      "total_balance": "110.00",
      "granted_balance": "10.00",
      "topped_up_balance": "100.00"
    }
  ]
}
```

--------------------------------

### DeepSeek API: JSON Output for /chat/completions

Source: https://api-docs.deepseek.com/zh-cn/news/news0725

Enables the model to output JSON formatted strings, useful for data processing and automation. Requires setting response_format to {'type': 'json_object'} and guiding the model with prompts.

```APIDOC
Endpoint: /chat/completions

Functionality: JSON Output

Description: Forces the model to output a JSON formatted string. Compatible with OpenAI API.

Usage:
1. Set `response_format` parameter to `{"type": "json_object"}`.
2. Guide the model in the prompt to output JSON in the desired format.
3. Appropriately set `max_tokens` to prevent truncation of the JSON string.

Example:
User provides text, model formats Q&A into JSON.

Reference: JSON Output Guide
```

--------------------------------

### DeepSeek V3.1 Pricing Information

Source: https://api-docs.deepseek.com/news/news250821

Informs users about upcoming pricing changes for DeepSeek APIs, including the start date for new pricing and the end of off-peak discounts. It directs users to the pricing page for more details.

```APIDOC
Pricing Changes 💳
  - 🔹 New pricing starts & off-peak discounts end at Sep 5th, 2025, 16:00 (UTC Time)
  - 🔹 Until then, APIs follow current pricing
  - 📝 Pricing page: https://api-docs.deepseek.com/quick_start/pricing/
```

--------------------------------

### DeepSeek API: JSON Output Configuration

Source: https://api-docs.deepseek.com/news/news0725

Enforces the model to output valid JSON format strings. Configure by setting 'response_format' to {'type': 'json_object'}, guiding the model in the prompt, and setting max_tokens appropriately.

```APIDOC
Endpoint: /chat/completions

Parameters:
  response_format: dict
    type: string, required. Must be 'json_object'.
  messages: list
    Content of the messages.
  max_tokens: integer, optional.
    Maximum number of tokens to generate.

Usage:
  Set `response_format` to `{'type': 'json_object'}`.
  Guide the model to output JSON format in the prompt.
  Set `max_tokens` appropriately to prevent truncation.
```

--------------------------------

### DeepSeek API Context Caching Example 2: Multi-round Conversation

Source: https://api-docs.deepseek.com/guides/kv_cache

Illustrates context caching in a multi-round conversation. The first request contains a system message and a user question. The second request includes the previous conversation history (system message and user question) plus a new user question, benefiting from a cache hit on the initial turns.

```APIDOC
Example 2: Multi-round Conversation

First Request:
```json
messages: [
    {"role": "system", "content": "You are a helpful assistant"},
    {"role": "user", "content": "What is the capital of China?"}
]
```

Second Request:
```json
messages: [
    {"role": "system", "content": "You are a helpful assistant"},
    {"role": "user", "content": "What is the capital of China?"},
    {"role": "assistant", "content": "The capital of China is Beijing."},
    {"role": "user", "content": "What is the capital of the United States?"}
]
```

Explanation: The second request reuses the initial system message and the first user message from the first request, resulting in a cache hit for these conversational turns.
```

--------------------------------

### DeepSeek App Introduction

Source: https://api-docs.deepseek.com/news/news250115

Introduces the DeepSeek App, highlighting its features, benefits, and availability. It is powered by DeepSeek-V3 and offers a free, seamless interaction experience across multiple platforms.

```APIDOC
Introducing DeepSeek App
  * 💡 Powered by world-class DeepSeek-V3
  * 🆓 FREE to use with seamless interaction
  * 📱 Now officially available on App Store & Google Play & Major Android markets
  * 🔗Download now: https://download.deepseek.com/app/
```

--------------------------------

### AnyOf Type

Source: https://api-docs.deepseek.com/zh-cn/guides/function_calling

Details the 'anyOf' keyword, allowing a field to match any of the provided schemas. The example illustrates an 'account' field that can be either an email address or an 11-digit phone number.

```JSON
{
    "type": "object",
    "properties": {
    "account": {
        "anyOf": [
            { "type": "string", "format": "email", "description": "可以是电子邮件地址" },
            { "type": "string", "pattern": "^\\d{11}$", "description": "或11位手机号码" }
        ]
    }
  }
}
```

--------------------------------

### Enum Type

Source: https://api-docs.deepseek.com/zh-cn/guides/function_calling

Explains the 'enum' type, which restricts values to a predefined set. The example shows an 'order_status' that can only be one of 'pending', 'processing', 'shipped', or 'cancelled'.

```JSON
{
    "type": "object",
    "properties": {
        "order_status": {
            "type": "string",
            "description": "Ordering status",
            "enum": ["pending", "processing", "shipped", "cancelled"]
        }
    }
}
```