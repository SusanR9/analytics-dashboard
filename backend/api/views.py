from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Record
from .serializers import RecordSerializer

@api_view(['GET'])
def get_records(request):
    search = request.GET.get('search', '')
    category = request.GET.get('category', '')
    min_amount = request.GET.get('minAmount')

    records = Record.objects.all()

    # 🔍 SEARCH FILTER
    if search:
        records = records.filter(name__icontains=search)

    # 🎯 CATEGORY FILTER (STRICT MATCH)
    if category:
        records = records.filter(category__iexact=category)

    # 💰 AMOUNT FILTER
    if min_amount:
        records = records.filter(amount__gte=min_amount)

    serializer = RecordSerializer(records, many=True)
    return Response(serializer.data)