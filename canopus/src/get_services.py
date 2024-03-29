from bs4 import BeautifulSoup
import requests

BASE_URL = 'https://docs.aws.amazon.com/service-authorization/latest/reference'

def get_aws_services():
    '''
    Scrape AWS to return all AWS services with URL links
    => [{ name: <service-name>, link: <service-link> }]
    '''

    services_data = []

    def get_html(url):
        '''Get webpage HTML'''

        response = requests.get(url)
        return response.text

    services_url = '/reference_policies_actions-resources-contextkeys.html'

    services_html = get_html(f'{BASE_URL}{services_url}')
    services_soup = BeautifulSoup(services_html, 'html.parser')
    services_list = services_soup.select_one('div[class="highlights"]').find_all('a')

    for item in services_list:
        name = item.text
        link = item['href']

        if link[0] == '.':
            link = link[1:]  # remove '.' from beginning of href

        service_dic = {
            'name': name,
            'link': f'{BASE_URL}{link}'
        }

        services_data.append(service_dic)

    return services_data