'use client'
import RequestApiKeyBox from "~/components/RequestApiKeyBox";
import Footer from "~/components/Footer";
import CodeBox from "~/components/CodeBox";
import Navbar from "~/components/Navbar";


const stats = [
    {label: 'Founded', value: '2021'},
    {label: 'Employees', value: '37'},
    {label: 'Countries', value: '12'},
    {label: 'Raised', value: '$25M'},
]

export default function Page() {
    return (
        <div className="bg-white py-24 sm:py-32">
            <Navbar/>
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div
                    className="mx-auto grid max-w-2xl grid-cols-1 items-start gap-x-8 gap-y-16 sm:gap-y-24 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                    <div className="lg:mt-24 pr-8">
                        <CodeBox pythonCode={"import requests\n" +
                            "\n" +
                            "# API URL\n" +
                            "url = 'https://api.example.com/data'\n" +
                            "# Bearer token\n" +
                            "token = 'YOUR_BEARER_TOKEN'\n" +
                            "# Headers\n" +
                            "headers = {\n" +
                            "    'Authorization': f'Bearer {token}',\n" +
                            "}\n" +
                            "# Make GET request\n" +
                            "response = requests.get(url, headers=headers)\n" +
                            "# Check response\n" +
                            "if response.status_code == 200:\n" +
                            "    print('Success:', response.json())\n" +
                            "else:\n" +
                            "    print('Failed:', response.status_code, response.text)\n"}
                                 javaCode={"import java.io.BufferedReader;\n" +
                                     "import java.io.IOException;\n" +
                                     "import java.io.InputStreamReader;\n" +
                                     "import java.net.HttpURLConnection;\n" +
                                     "import java.net.URL;\n" +
                                     "\n" +
                                     "public class ApiRequest {\n" +
                                     "\n" +
                                     "    public static void main(String[] args) {\n" +
                                     "        String apiUrl = \"https://api.example.com/data\";\n" +
                                     "        String bearerToken = \"YOUR_BEARER_TOKEN\";\n" +
                                     "\n" +
                                     "        try {\n" +
                                     "            URL url = new URL(apiUrl);\n" +
                                     "            HttpURLConnection connection = (HttpURLConnection) url.openConnection();\n" +
                                     "\n" +
                                     "            // Set the request method to GET\n" +
                                     "            connection.setRequestMethod(\"GET\");\n" +
                                     "\n" +
                                     "            // Add Authorization header with Bearer token\n" +
                                     "            connection.setRequestProperty(\"Authorization\", \"Bearer \" + bearerToken);\n" +
                                     "\n" +
                                     "            // Connect to the API\n" +
                                     "            connection.connect();\n" +
                                     "\n" +
                                     "            // Check for successful response\n" +
                                     "            if (connection.getResponseCode() == HttpURLConnection.HTTP_OK) {\n" +
                                     "                // Read response\n" +
                                     "                BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));\n" +
                                     "                String line;\n" +
                                     "                StringBuilder response = new StringBuilder();\n" +
                                     "                while ((line = reader.readLine()) != null) {\n" +
                                     "                    response.append(line);\n" +
                                     "                }\n" +
                                     "                reader.close();\n" +
                                     "                // Output response\n" +
                                     "                System.out.println(\"Success: \" + response.toString());\n" +
                                     "            } else {\n" +
                                     "                System.out.println(\"Failed: \" + connection.getResponseCode());\n" +
                                     "            }\n" +
                                     "        } catch (IOException e) {\n" +
                                     "            e.printStackTrace();\n" +
                                     "        }\n" +
                                     "    }\n" +
                                     "}\n"}/>
                    </div>
                    <div>
                        <div className="text-base leading-7 text-gray-700 lg:max-w-lg">
                            <p className="text-base font-semibold leading-7 text-indigo-600">API Grimoire</p>
                            <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                                Unleash the Stones of Wisdom: Your Gateway to Masonic Quotes! 🧱🔮
                            </h1>
                            <div className="max-w-xl">
                                <p className="mt-6">
                                    Are you on a quest to unearth the treasured wisdom of the mighty Mason? Look no
                                    further! But ah ah ah! 🚫🔮 Entry to the Masonic Wisdom API is not as simple as
                                    chanting a secret spell or decoding a hidden cipher. Nay, it involves securing a
                                    key... the renowned API token!
                                </p>
                                <p className="mt-6">
                                    Venture to our cybernetic realm and scribe your particulars, and the sacred HSG
                                    insignia, upon our token request parchment (online form).
                                </p>
                                <RequestApiKeyBox/>
                                <p className="mt-6">
                                    Upon this singular delivery, no further electronic missives shall venture forth from
                                    our domain to thine inbox. Verily, your digital scroll address hath been ensconced
                                    within our annals as a mere hash, shrouded in an impenetrable veil of cryptography.

                                    Should thee desire a new sigil (token), merely extend thy request unto us once more.
                                    Lo! The old shall crumble, replaced post-haste with the new, ensuring the sanctity
                                    and fortitude of thine access to the treasured wisdom of ancient masons remains ever
                                    steadfast.
                                </p>
                                <p className="mt-8">
                                    Inscribe the mighty masons’ wisdom into your codes, melding their sturdy
                                    philosophies with your digital marvels. May every byte and bit be imbued with the
                                    time-tested wisdom that has, for generations, turned mere concepts into concrete
                                    reality.

                                    Henceforth, go forth, dear developer, and let thine applications be not merely
                                    functional, but also beacons of ancient wisdom in our modern, digital world.

                                    In eternal camaraderie and with a chisel of wisdom.
                                </p>
                            </div>
                        </div>
                        <dl className="mt-10 grid grid-cols-2 gap-8 border-t border-gray-900/10 pt-10 sm:grid-cols-4">
                            {stats.map((stat, statIdx) => (
                                <div key={statIdx}>
                                    <dt className="text-sm font-semibold leading-6 text-gray-600">{stat.label}</dt>
                                    <dd className="mt-2 text-3xl font-bold leading-10 tracking-tight text-gray-900">{stat.value}</dd>
                                </div>
                            ))}
                        </dl>
                        <div className="mt-10 flex">
                            <a href="#" className="text-base font-semibold leading-7 text-indigo-600">
                                Learn more about our company <span aria-hidden="true">&rarr;</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}
