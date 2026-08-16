from sqlalchemy.orm import Session

from app.models.platform_activity import PlatformActivity


def log_activity(
    db: Session,
    user_id: int,
    activity_type: str,
    module: str = None,
    description: str = None,
    endpoint: str = None,
):
    activity = PlatformActivity(
        user_id=user_id,
        activity_type=activity_type,
        module=module,
        description=description,
        endpoint=endpoint,
    )

    db.add(activity)
    db.commit()

    return activity