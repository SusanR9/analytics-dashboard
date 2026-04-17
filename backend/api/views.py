from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Record
from .serializers import RecordSerializer

@api_view(['GET'])
def get_records(request):
    search = request.GET.get('search', '')
    category = request.GET.get('category', '')
    min_amount = request.GET.get('minAmount')
    page = int(request.GET.get('page', 1))
    limit = 10

    records = Record.objects.all()

    # 🔍 SEARCH FILTER
    if search:
        records = records.filter(name__icontains=search)

    # 📂 CATEGORY FILTER
    if category and category != "All":
        records = records.filter(category=category)

    # 💰 MIN AMOUNT FILTER
    if min_amount not in [None, ""]:
        try:
            min_amount = float(min_amount)
            records = records.filter(amount__gte=min_amount)
        except:
            pass

    # 📊 TOTAL COUNT
    total = records.count()

    # 📄 PAGINATION
    start = (page - 1) * limit
    end = start + limit

    serializer = RecordSerializer(records[start:end], many=True)

    return Response({
        "data": serializer.data,
        "total": total
    })